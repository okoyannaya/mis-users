import { useSelector } from "react-redux";
import { UsersList } from "@components/users-list";
import { RootState } from "@containers/redux/store";

import { getDeclinationOfWordByQuantity } from "./helpers";

import "./users-list-page.css";

export const UsersListPage = () => {
  const { users } = useSelector((state: RootState) => state.users);

  const human = getDeclinationOfWordByQuantity(users.length);

  return (
    <div className="users-list-page">
      <div className="header-user-list-page">
        <span className="quantity-people"> <span className="span-bold">Пользователи клиники</span>{` ${users.length} ${human}`}</span>

        <div className="add-button-wrapper">
            <div className="add-button-icon"/>
             <button children="Добавить нового пользователя" className="add-button"/>
        </div>
       
      </div>
      <UsersList />
    </div>
  );
};
