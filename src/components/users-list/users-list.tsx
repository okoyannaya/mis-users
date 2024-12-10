import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Loader } from "@components/loader";
import { useAppDispatch } from "@containers/redux/hooks";
import { RootState } from "@containers/redux/store";
import { fetchAllUsers, User } from "@containers/redux/users-slice";

import { HeaderTable } from "./header-table";
import { UserRow } from "./user-row";

import "./users-list.css";

type SortField = "last_name" | "gender" | "birth_date";
type SortOrder = "asc" | "desc" | "default";

export const UsersList: FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  const [sortedUsers, setSortedUsers] = useState<User[]>(users);
  const [sortConfig, setSortConfig] = useState<{
    field: SortField | null;
    order: SortOrder;
  }>({ field: null, order: "default" });
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSort = (field: SortField) => {
    let nextOrder: SortOrder = "asc";

    if (sortConfig.field === field) {
      nextOrder =
        sortConfig.order === "asc"
          ? "desc"
          : sortConfig.order === "desc"
          ? "default"
          : "asc";
    }

    setSortConfig({ field, order: nextOrder });

    if (nextOrder === "default") {
      setSortedUsers([...users]);

      return;
    }

    const sorted = [...users].sort((a, b) => {
      let comparison = 0;

      if (field === "last_name") {
        const isARussian = /^[а-яА-Я]/.test(a.last_name);
        const isBRussian = /^[а-яА-Я]/.test(b.last_name);
        if (isARussian && !isBRussian) comparison = -1;
        else if (!isARussian && isBRussian) comparison = 1;
        else comparison = a.last_name.localeCompare(b.last_name);
      } else if (field === "gender") {
        const genderOrder = ["мужской", "женский", "не указано"];
        const indexA = genderOrder.indexOf(a.gender || "не указано");
        const indexB = genderOrder.indexOf(b.gender || "не указано");
        comparison = indexA - indexB;
      } else if (field === "birth_date") {
        const dateA = new Date(a.birth_date || "9999-12-31");
        const dateB = new Date(b.birth_date || "9999-12-31");
        comparison = dateA.getTime() - dateB.getTime();
      }

      return nextOrder === "asc" ? comparison : -comparison;
    });

    setSortedUsers(sorted);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const filteredUsers = sortedUsers.filter((user) =>
    user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    setSortedUsers([...users]);
  }, [users]);

  if (loading) return <Loader isLoading={loading} />;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="table-wrapper">
      <HeaderTable
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        sortConfig={sortConfig}
        onSort={handleSort}
      />
      <div className="table-body">
        {filteredUsers.length ? (
          filteredUsers.map((user) => <UserRow user={user} key={user.id} />)
        ) : (
          <div className="empty-message">Список пользователей пуст</div>
        )}
      </div>
    </div>
  );
};
