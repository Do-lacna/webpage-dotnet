import { useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, LayoutGrid } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import type { CategoryDto } from '@/lib/catalogApi';

export interface CategoryTreeNode {
  category: CategoryDto;
  children: CategoryTreeNode[];
}

function buildCategoryTree(categories: CategoryDto[]): CategoryTreeNode[] {
  const nodesById = new Map<number, CategoryTreeNode>();
  categories.forEach((category) => {
    nodesById.set(category.id, { category, children: [] });
  });

  const roots: CategoryTreeNode[] = [];
  nodesById.forEach((node) => {
    const parentId = node.category.parent_id;
    const parentNode = parentId !== null ? nodesById.get(parentId) : undefined;
    if (parentNode) {
      parentNode.children.push(node);
    } else {
      roots.push(node);
    }
  });

  const sortNodes = (nodes: CategoryTreeNode[]) => {
    nodes.sort(
      (a, b) =>
        b.category.popularity - a.category.popularity ||
        (a.category.name ?? '').localeCompare(b.category.name ?? ''),
    );
    nodes.forEach((node) => sortNodes(node.children));
  };
  sortNodes(roots);

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
  const isExpanded = expandedIds.has(node.category.id);
  const isSelected = selectedCategoryId === node.category.id;

  return (
    <div>
      <div
        className={cn(
          'flex items-center gap-1 rounded-md py-1.5 pr-2 text-sm cursor-pointer hover:bg-brand-lilac/20 transition-colors',
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
              onToggle(node.category.id);
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
        <button
          type="button"
          onClick={() => onSelect(node.category.id)}
          className="flex-1 truncate text-left"
          title={node.category.name ?? undefined}
        >
          {node.category.name}
        </button>
      </div>
      {hasChildren && isExpanded && (
        <div>
          {node.children.map((child) => (
            <CategoryTreeItem
              key={child.category.id}
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
            key={node.category.id}
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
