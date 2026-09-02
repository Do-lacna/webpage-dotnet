import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { findAncestorIds, type MainCategoryGroup } from '../categoryGroups';

const SIDEBAR_SKELETON_KEYS = Array.from(
  { length: 6 },
  (_, index) => `category-skeleton-${index}`,
);

interface CategorySidebarProps {
  title: string;
  groups: MainCategoryGroup[];
  selectedCategoryId?: number;
  onSelect: (categoryId: number | undefined) => void;
  isLoading?: boolean;
  /** Category to expand its ancestors for and scroll into view. */
  focusCategoryId?: number;
}

interface CategoryTreeItemProps {
  group: MainCategoryGroup;
  depth: number;
  selectedCategoryId?: number;
  expandedIds: Set<number>;
  itemRefs: Map<number, HTMLDivElement>;
  onToggleExpand: (categoryId: number) => void;
  onSelect: (categoryId: number | undefined) => void;
}

const CategoryTreeItem = ({
  group,
  depth,
  selectedCategoryId,
  expandedIds,
  itemRefs,
  onToggleExpand,
  onSelect,
}: CategoryTreeItemProps) => {
  const hasChildren = group.children.length > 0;
  const isExpanded = expandedIds.has(group.id);
  const isActive = selectedCategoryId === group.id;
  // Any category with subcategories is expand-only; products are only
  // filterable by picking a final (leaf) level, however deep it is.
  const isSelectable = !hasChildren;

  return (
    <div
      ref={(el) => {
        if (el) itemRefs.set(group.id, el);
        else itemRefs.delete(group.id);
      }}
      className={cn('w-full', depth > 0 && 'border-l border-slate-200 pl-2')}
    >
      <div
        className={cn(
          'group flex items-center rounded-lg transition-colors',
          isActive
            ? 'bg-brand-primary text-white shadow-sm'
            : 'text-slate-600 hover:bg-brand-primary/10 hover:text-brand-indigo',
        )}
      >
        <button
          type="button"
          aria-current={isActive ? 'true' : undefined}
          className={cn(
            'flex-1 min-w-0 text-left px-3 py-2 font-medium truncate',
            depth === 0 ? 'text-sm' : 'text-[13px]',
            !isSelectable && 'font-semibold',
          )}
          onClick={() =>
            isSelectable ? onSelect(group.id) : onToggleExpand(group.id)
          }
        >
          {group.name}
        </button>
        {hasChildren && (
          <button
            type="button"
            aria-label={
              isExpanded ? 'Zbaliť podkategórie' : 'Rozbaliť podkategórie'
            }
            aria-expanded={isExpanded}
            className="flex-shrink-0 p-1.5 mr-1 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"
            onClick={() => onToggleExpand(group.id)}
          >
            <ChevronRight
              className={cn(
                'h-4 w-4 transition-transform duration-200',
                isExpanded && 'rotate-90',
              )}
            />
          </button>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="flex flex-col gap-0.5 mt-0.5 mb-1">
          {group.children.map((child) => (
            <CategoryTreeItem
              key={child.id}
              group={child}
              depth={depth + 1}
              selectedCategoryId={selectedCategoryId}
              expandedIds={expandedIds}
              itemRefs={itemRefs}
              onToggleExpand={onToggleExpand}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Left-hand category navigation. Main categories with subcategories can be
 * expanded in place; renders as a vertical list on both desktop and mobile
 * (a flat chip row can't accommodate nested subcategories).
 */
const CategorySidebar = ({
  title,
  groups,
  selectedCategoryId,
  onSelect,
  isLoading,
  focusCategoryId,
}: CategorySidebarProps) => {
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const itemRefsRef = useRef(new Map<number, HTMLDivElement>());

  const toggleExpand = (categoryId: number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) next.delete(categoryId);
      else next.add(categoryId);
      return next;
    });
  };

  useEffect(() => {
    // Selecting a category collapses everything else, opening only the path to it.
    setExpandedIds(
      new Set(findAncestorIds(groups, selectedCategoryId ?? -1) ?? []),
    );
  }, [selectedCategoryId, groups]);

  useEffect(() => {
    if (focusCategoryId == null) return;

    const frame = requestAnimationFrame(() => {
      itemRefsRef.current
        .get(focusCategoryId)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    return () => cancelAnimationFrame(frame);
  }, [focusCategoryId]);

  return (
    <aside className="w-full md:w-64 flex-shrink-0 md:sticky md:top-24">
      <h2 className="hidden md:block text-lg font-bold text-brand-indigo mb-3">
        {title}
      </h2>
      <div className="flex flex-col gap-0.5 rounded-xl border border-slate-100 bg-white p-2 shadow-sm">
        {isLoading
          ? SIDEBAR_SKELETON_KEYS.map((key) => (
              <Skeleton key={key} className="h-9 w-full rounded-lg" />
            ))
          : groups.map((group) => (
              <CategoryTreeItem
                key={group.id}
                group={group}
                depth={0}
                selectedCategoryId={selectedCategoryId}
                expandedIds={expandedIds}
                itemRefs={itemRefsRef.current}
                onToggleExpand={toggleExpand}
                onSelect={onSelect}
              />
            ))}
      </div>
    </aside>
  );
};

export default CategorySidebar;
