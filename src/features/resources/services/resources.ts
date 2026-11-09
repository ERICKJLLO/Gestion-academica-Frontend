import { http } from "@/src/features/common/services/http";
import type { ListResponse } from "@/src/features/common/domain/api";
import type {
  AcademicResource,
  ResourceFilters,
} from "../domain/types";

export const resourcesService = {
  getAll: (filters: ResourceFilters = {}) => {
    const params = new URLSearchParams();

    params.set("page", String(filters.page ?? 1));
    params.set("limit", String(filters.limit ?? 10));

    if (filters.subjectId) {
      params.set("subjectId", filters.subjectId);
    }

    if (filters.search) {
      params.set("search", filters.search);
    }

    return http<ListResponse<AcademicResource>>(
      `/api/resources?${params.toString()}`
    );
  },

  getById: (id: string) =>
    http<AcademicResource>(
      `/api/resources/${encodeURIComponent(id)}`
    ),

  upload: (
    file: File,
    title: string,
    subjectId: string,
    uploadedById: string
  ) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("title", title);
    formData.append("subjectId", subjectId);
    formData.append("uploadedById", uploadedById);

    return http<{
      success: boolean;
      data: AcademicResource & { publicUrl?: string };
    }>("/api/resources", {
      method: "POST",
      body: formData,
    });
  },

  delete: (id: string) =>
    http<{ success: boolean }>(
      `/api/resources/${encodeURIComponent(id)}`,
      {
        method: "DELETE",
      }
    ),
};
