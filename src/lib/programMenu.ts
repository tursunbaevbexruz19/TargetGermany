export const PROGRAM_CATEGORY_FALLBACK_ID = "uncategorized";
export const PROGRAM_CATEGORY_FALLBACK_LABEL = "Uncategorized";

export interface ProgramCategorySummary {
  _id: string;
  title: string;
  sortOrder?: number | null;
}

export interface ProgramNavigableCourse {
  _id: string;
  title?: string | null;
  menuLabel?: string | null;
  menuOrder?: number | null;
  sortOrder?: number | null;
  programCategory?: ProgramCategorySummary | null;
}

export interface ProgramMenuItem {
  id: string;
  courseId: string;
  label: string;
  order: number;
}

export interface ProgramMenuSelection {
  categoryId?: string;
  courseId?: string;
}

export interface ProgramMenuGroup {
  id: string;
  label: string;
  order: number;
  items: ProgramMenuItem[];
}

const DEFAULT_GROUP_ORDER = 9999;

function toSortableNumber(value: number | null | undefined, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function sortByOrderThenLabel<T extends { order: number; label: string }>(items: T[]) {
  return [...items].sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order;
    }

    return a.label.localeCompare(b.label, undefined, { sensitivity: "base" });
  });
}

export function getCourseMenuCategory(course: ProgramNavigableCourse) {
  if (course.programCategory?._id && course.programCategory.title?.trim()) {
    return {
      id: course.programCategory._id,
      label: course.programCategory.title.trim(),
      order: toSortableNumber(course.programCategory.sortOrder, DEFAULT_GROUP_ORDER),
    };
  }

  return {
    id: PROGRAM_CATEGORY_FALLBACK_ID,
    label: PROGRAM_CATEGORY_FALLBACK_LABEL,
    order: DEFAULT_GROUP_ORDER,
  };
}

export function getCourseMenuLabel(course: ProgramNavigableCourse) {
  return (course.menuLabel || course.title || "Untitled Course").trim();
}

export function buildProgramMenu(courses?: ProgramNavigableCourse[] | null): ProgramMenuGroup[] {
  if (!courses || courses.length === 0) {
    return [];
  }

  const groups = new Map<string, ProgramMenuGroup>();

  for (const course of courses) {
    const category = getCourseMenuCategory(course);
    const item: ProgramMenuItem = {
      id: course._id,
      courseId: course._id,
      label: getCourseMenuLabel(course),
      order: toSortableNumber(course.menuOrder ?? course.sortOrder, DEFAULT_GROUP_ORDER),
    };

    if (!groups.has(category.id)) {
      groups.set(category.id, {
        id: category.id,
        label: category.label,
        order: category.order,
        items: [item],
      });
      continue;
    }

    const currentGroup = groups.get(category.id)!;
    currentGroup.order = Math.min(currentGroup.order, category.order);
    currentGroup.items.push(item);
  }

  return sortByOrderThenLabel(Array.from(groups.values())).map((group) => ({
    ...group,
    items: sortByOrderThenLabel(group.items),
  }));
}
