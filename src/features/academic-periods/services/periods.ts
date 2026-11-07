import { http } from "@/src/features/common/services/http";
import type {
  AcademicPeriod,
  CreatePeriodData,
  UpdatePeriodData,
} from "../domain/types";
import type {
  ListResponse,
} from "@/src/features/common/domain/api";

export const periodsService = {
  getAll: () =>
    http<ListResponse<AcademicPeriod>>("/api/periods"),

  getById: (id: string) =>
    http<{ data: AcademicPeriod }>(`/api/periods/${id}`),

  create: (data: CreatePeriodData) =>
    http<{ data: AcademicPeriod }>("/api/periods", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdatePeriodData) =>
    http<{ data: AcademicPeriod }>(`/api/periods/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    http<{ data: AcademicPeriod }>(`/api/periods/${id}`, {
      method: "DELETE",
    }),
};
