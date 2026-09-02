import type { CategoryDto } from '@/lib/catalogApi';

export interface MainCategoryGroup {
  /** Category id at this level (root id for top-level groups). */
  id: number;
  name: string;
  children: MainCategoryGroup[];
}

interface MutableNode extends MainCategoryGroup {
  childrenById: Map<number, MutableNode>;
}

// Categories hidden from the sidebar (and therefore from filtering), by name.
const EXCLUDED_CATEGORY_NAMES = new Set([
  'kapsuly do umyvacky riadu',
  'plienky',
  'pracie prachy',
  'pracie prasky',
]);

export const normalizeName = (name: string) =>
  name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

const isExcludedCategoryName = (name: string) =>
  EXCLUDED_CATEGORY_NAMES.has(normalizeName(name));

/**
 * Builds a category tree from the flat leaf-category list returned by
 * `/api/categories`, using each leaf's `path_from_root(_numeric)` to place it
 * (and any intermediate ancestors) at the right depth. Top-level entries are
 * the root categories; deeper levels become expandable subcategories.
 */
export function buildMainCategoryGroups(
  categories: CategoryDto[],
): MainCategoryGroup[] {
  const rootsById = new Map<number, MutableNode>();

  for (const category of categories) {
    const ids = category.path_from_root_numeric ?? [category.id];
    const names = category.path_from_root ?? [category.name ?? ''];

    let levelMap = rootsById;
    for (let depth = 0; depth < ids.length; depth++) {
      const id = ids[depth];
      const name = names[depth];
      if (id == null || name == null || isExcludedCategoryName(name)) break;

      let node = levelMap.get(id);
      if (!node) {
        node = { id, name, children: [], childrenById: new Map() };
        levelMap.set(id, node);
      }
      levelMap = node.childrenById;
    }
  }

  const toSortedArray = (map: Map<number, MutableNode>): MainCategoryGroup[] =>
    Array.from(map.values())
      .map((node) => ({
        id: node.id,
        name: node.name,
        children: toSortedArray(node.childrenById),
      }))
      .sort((a, b) => a.name.localeCompare(b.name, 'sk'));

  return toSortedArray(rootsById);
}

export interface LeafCategoryOption {
  id: number;
  /** Full breadcrumb, e.g. "Mliečne výrobky > Jogurty". */
  label: string;
}

/**
 * Flattens the tree down to its selectable (leaf, no-children) categories,
 * each labeled with its full ancestor breadcrumb for use in a search list.
 */
export function flattenLeafCategories(
  groups: MainCategoryGroup[],
): LeafCategoryOption[] {
  const options: LeafCategoryOption[] = [];

  const visit = (node: MainCategoryGroup, ancestorNames: string[]) => {
    const path = [...ancestorNames, node.name];
    if (node.children.length === 0) {
      options.push({ id: node.id, label: path.join(' > ') });
      return;
    }
    for (const child of node.children) visit(child, path);
  };

  for (const group of groups) visit(group, []);

  return options;
}

/** Ids of every ancestor (not including the category itself) leading to `categoryId`. */
export function findAncestorIds(
  groups: MainCategoryGroup[],
  categoryId: number,
): number[] | null {
  const search = (
    nodes: MainCategoryGroup[],
    ancestorIds: number[],
  ): number[] | null => {
    for (const node of nodes) {
      if (node.id === categoryId) return ancestorIds;
      const found = search(node.children, [...ancestorIds, node.id]);
      if (found) return found;
    }
    return null;
  };

  return search(groups, []);
}
