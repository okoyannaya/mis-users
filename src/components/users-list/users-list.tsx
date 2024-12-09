import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Loader } from "@components/loader";
import { useAppDispatch } from "@containers/redux/hooks";
import { RootState } from "@containers/redux/store";
import { fetchAllUsers, User } from "@containers/redux/users-slice";

import "./users-list.css";

type SortField = "last_name" | "gender" | "birth_date";
type SortOrder = "asc" | "desc" | "default";

export const UsersList: FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  const [sortedUsers, setSortedUsers] = useState<User[]>(users);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    setSortedUsers([...users]);
  }, [users]);

  const handleSort = (field: SortField) => {
    let nextOrder: SortOrder = "asc";
    if (sortField === field) {
      nextOrder =
        sortOrder === "asc" ? "desc" : sortOrder === "desc" ? "default" : "asc";
    }

    setSortField(field);
    setSortOrder(nextOrder);

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

  const filteredUsers = sortedUsers.filter((user) =>
    user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <Loader isLoading={loading} />;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="table-wrapper">
      <div className="header-wrapper">
        <div className="table-header">
          <input
            className="search-input"
            type="text"
            placeholder="Поиск по фамилии"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="search-icon" />
        </div>
        <div className="table-columns grid">
          <div
            className="column-header column-sort"
            onClick={() => handleSort("last_name")}
          >
            ФИО пользователя
            <div className="icon-sort" />
            {sortField === "last_name" &&
              (sortOrder === "asc"
                ? " А-Я"
                : sortOrder === "desc"
                ? " Я-А"
                : "")}
          </div>
          <div className="column-header">Контактные данные</div>
          <div
            className="column-header column-sort"
            onClick={() => handleSort("birth_date")}
          >
            Дата рождения
            <div className="icon-sort" />
          </div>
          <div
            className="column-header column-sort"
            onClick={() => handleSort("gender")}
          >
            Пол
            <div className="icon-sort" />
          </div>
          <div className="column-header">Роль</div>
          <div className="column-header" />
        </div>
      </div>
      <div className="table-body">
        {filteredUsers.length ? (
          filteredUsers.map((user) => (
            <div className="table-row grid" key={user.id}>
              <div className="user-info">
                <div
                  className="avatar"
                  style={{ backgroundImage: `url(${user.avatar})` }}
                ></div>
                <span className="user-name">
                  {user.first_name} {user.last_name}
                </span>
              </div>
              <div className="user-email">{user.email}</div>
              <div className="user-date">
                {user.birth_date ? user.birth_date : "Не указано"}
              </div>
              <div className="user-gender">
                {user.gender ? user.gender : "Не указано"}
              </div>
              <div className="user-role">
                {user.role ? user.role : "Не указано"}
              </div>
              <div className="user-actions">
                <button className="edit-btn">✎</button>
                <button className="delete-btn">🗑</button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-message">Список пользователей пуст</div>
        )}
      </div>
    </div>
  );
};
