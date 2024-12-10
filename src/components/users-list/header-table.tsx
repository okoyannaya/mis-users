import { FC } from "react";
import { SortIcon } from "@components/sort-icon";

type SortField = "last_name" | "gender" | "birth_date";
type SortOrder = "asc" | "desc" | "default";

interface HeaderTableProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortConfig: { field: SortField | null; order: SortOrder };
  onSort: (field: SortField) => void;
}

export const HeaderTable: FC<HeaderTableProps> = ({
  searchQuery,
  onSearchChange,
  sortConfig,
  onSort,
}) => {
  return (
    <div className="header-wrapper">
      <div className="table-header">
        <input
          className="search-input"
          type="text"
          placeholder="Поиск по фамилии"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <div className="search-icon" />
      </div>
      <div className="table-columns grid">
        <div
          className="column-header column-sort"
          onClick={() => onSort("last_name")}
        >
          ФИО пользователя
          <SortIcon
            sortOrder={
              sortConfig.field === "last_name" ? sortConfig.order : "default"
            }
          />
        </div>
        <div className="column-header">Контактные данные</div>
        <div
          className="column-header column-sort"
          onClick={() => onSort("birth_date")}
        >
          Дата рождения
          <SortIcon
            sortOrder={
              sortConfig.field === "birth_date" ? sortConfig.order : "default"
            }
          />
        </div>
        <div
          className="column-header column-sort"
          onClick={() => onSort("gender")}
        >
          Пол
          <SortIcon
            sortOrder={
              sortConfig.field === "gender" ? sortConfig.order : "default"
            }
          />
        </div>
        <div className="column-header">Роль</div>
      </div>
    </div>
  );
};
