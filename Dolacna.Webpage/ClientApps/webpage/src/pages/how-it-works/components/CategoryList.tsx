import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export interface CategoryGroup {
  name: string;
  /** Subcategories a user can add to the list. Optional for now. */
  items?: string[];
}

interface CategoryListProps {
  title: string;
  subtitle?: string;
  groups: CategoryGroup[];
  /** Shown inside a category that has no subcategories yet. */
  emptyLabel?: string;
}

/**
 * Expandable overview of product categories. Each main category is an
 * accordion item that reveals its subcategories (rendered as chips) on expand.
 */
const CategoryList = ({
  title,
  subtitle,
  groups,
  emptyLabel,
}: CategoryListProps) => {
  if (!Array.isArray(groups) || groups.length === 0) return null;

  return (
    <div className="glass-panel p-6 md:p-8 reveal-animation">
      <h3 className="text-xl md:text-2xl font-bold text-brand-indigo text-left mb-2">
        {title}
      </h3>
      {subtitle && (
        <p className="text-muted-foreground text-base md:text-lg text-left leading-relaxed mb-4">
          {subtitle}
        </p>
      )}

      <Accordion type="multiple" className="w-full">
        {groups.map((group) => (
          <AccordionItem
            key={group.name}
            value={group.name}
            className="border-brand-primary/15"
          >
            <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-brand-indigo hover:no-underline">
              {group.name}
            </AccordionTrigger>
            <AccordionContent>
              {group.items && group.items.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full bg-brand-primary/10 text-brand-indigo px-3 py-1 text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                emptyLabel && (
                  <p className="text-muted-foreground italic">{emptyLabel}</p>
                )
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CategoryList;
