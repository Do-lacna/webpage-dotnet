import { useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, LayoutGrid } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { getCategoryImageUrl, type CategoryDto } from '@/lib/catalogApi';

export interface CategoryTreeNode {
  id: number;
  name: string;
  // Only set for actual (leaf) categories returned by the API; ancestor
  // levels are synthesized from path_from_root and aren't selectable.
  category: CategoryDto | null;
  children: CategoryTreeNode[];
}

// Only these top-level categories are shown as sidebar roots; everything
// else nests underneath them based on its path_from_root(_numeric) ancestry.
const ALLOWED_ROOT_CATEGORY_IDS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 86, 1564];

// The public /categories endpoint only returns leaf (purchasable) categories;
// root and intermediate grouping categories have no record of their own, so
// the tree has to be reconstructed from each leaf's path_from_root(_numeric).
function buildCategoryTree(categories: CategoryDto[]): CategoryTreeNode[] {
  const allowedRootIds = new Set(ALLOWED_ROOT_CATEGORY_IDS);
  const nodesById = new Map<number, CategoryTreeNode>();

  categories
    .filter((category) => category.is_purchasable)
    .forEach((category) => {
      const ids = category.path_from_root_numeric;
      const names = category.path_from_root;
      if (!ids?.length || !names?.length || !allowedRootIds.has(ids[0])) return;

      let parentNode: CategoryTreeNode | undefined;
      ids.forEach((id, index) => {
        let node = nodesById.get(id);
        if (!node) {
          node = { id, name: names[index] ?? '', category: null, children: [] };
          nodesById.set(id, node);
        }
        const isLeaf = index === ids.length - 1;
        if (isLeaf) {
          node.category = category;
          node.name = category.name ?? node.name;
        }
        if (parentNode && !parentNode.children.includes(node)) {
          parentNode.children.push(node);
        }
        parentNode = node;
      });
    });

  const sortNodes = (nodes: CategoryTreeNode[]) => {
    nodes.sort(
      (a, b) =>
        (b.category?.popularity ?? 0) - (a.category?.popularity ?? 0) ||
        a.name.localeCompare(b.name),
    );
    nodes.forEach((node) => sortNodes(node.children));
  };

  const roots = ALLOWED_ROOT_CATEGORY_IDS.map((id) => nodesById.get(id)).filter(
    (node): node is CategoryTreeNode => node !== undefined,
  );
  roots.forEach((root) => sortNodes(root.children));

  return roots;
}

interface CategoryTreeItemProps {
  node: CategoryTreeNode;
  level: number;
  selectedCategoryId: number | null;
  expandedIds: Set<number>;
  onSelect: (categoryId: number) => void;
  onToggle: (categoryId: number) => void;
}

const CategoryTreeItem = ({
  node,
  level,
  selectedCategoryId,
  expandedIds,
  onSelect,
  onToggle,
}: CategoryTreeItemProps) => {
  const hasChildren = node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const isSelectable = node.category !== null;
  const isSelected = isSelectable && selectedCategoryId === node.category?.id;

  return (
    <div>
      <div
        className={cn(
          'flex items-center gap-1 rounded-md py-1.5 pr-2 text-sm hover:bg-brand-lilac/20 transition-colors',
          isSelected && 'bg-brand-lilac/30 font-medium text-brand-primary',
        )}
        style={{ paddingLeft: 8 + level * 14 }}
      >
        {hasChildren ? (
          <button
            type="button"
            aria-label={isExpanded ? 'Zbaliť kategóriu' : 'Rozbaliť kategóriu'}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(node.id);
            }}
            className="shrink-0 p-0.5 text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" />
            )}
          </button>
        ) : (
          <span className="w-[18px] shrink-0" />
        )}
        {isSelectable ? (
          <button
            type="button"
            onClick={() => onSelect(node.id)}
            className="flex flex-1 items-center gap-2 truncate text-left cursor-pointer"
            title={node.name}
          >
            {level === 0 && (
              <img
                src={getCategoryImageUrl(node.id)}
                alt=""
                loading="lazy"
                className="h-6 w-6 shrink-0 rounded object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
            <span className="truncate">{node.name}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onToggle(node.id)}
            className="flex flex-1 items-center gap-2 truncate text-left cursor-pointer font-medium text-foreground"
            title={node.name}
          >
            {level === 0 && (
              <img
                src={getCategoryImageUrl(node.id)}
                alt=""
                loading="lazy"
                className="h-6 w-6 shrink-0 rounded object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
            <span className="truncate">{node.name}</span>
          </button>
        )}
      </div>
      {hasChildren && isExpanded && (
        <div>
          {node.children.map((child) => (
            <CategoryTreeItem
              key={child.id}
              node={child}
              level={level + 1}
              selectedCategoryId={selectedCategoryId}
              expandedIds={expandedIds}
              onSelect={onSelect}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface CategorySidebarProps {
  categories: CategoryDto[] | undefined;
  isLoading: boolean;
  isError: boolean;
  selectedCategoryId: number | null;
  onSelectCategory: (categoryId: number | null) => void;
}

const CategorySidebar = ({
  categories,
  isLoading,
  isError,
  selectedCategoryId,
  onSelectCategory,
}: CategorySidebarProps) => {
  const { t } = useTranslation();
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  const tree = useMemo(
    () => (categories ? buildCategoryTree(categories) : []),
    [categories],
  );
  const skeletonKeys = useMemo(
    () => Array.from({ length: 8 }, (_, i) => `category-skeleton-${i}`),
    [],
  );

  const toggleExpanded = (categoryId: number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  return (
    <nav
      className="space-y-1"
      aria-label={t('searchProductsPage.categoriesLabel')}
    >
      <button
        type="button"
        onClick={() => onSelectCategory(null)}
        className={cn(
          'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm font-medium cursor-pointer hover:bg-brand-lilac/20 transition-colors',
          selectedCategoryId === null && 'bg-brand-lilac/30 text-brand-primary',
        )}
      >
        <LayoutGrid className="h-3.5 w-3.5 shrink-0" />
        {t('searchProductsPage.allProducts')}
      </button>

      {isLoading &&
        skeletonKeys.map((key) => (
          <Skeleton key={key} className="ml-2 h-6 w-[85%]" />
        ))}

      {isError && (
        <p className="px-2 py-1.5 text-sm text-destructive">
          {t('searchProductsPage.loadErrorCategories')}
        </p>
      )}

      {!isLoading &&
        !isError &&
        tree.map((node) => (
          <CategoryTreeItem
            key={node.id}
            node={node}
            level={0}
            selectedCategoryId={selectedCategoryId}
            expandedIds={expandedIds}
            onSelect={onSelectCategory}
            onToggle={toggleExpanded}
          />
        ))}
    </nav>
  );
};

export default CategorySidebar;
