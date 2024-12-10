import { FC } from 'react'
import { User } from '@containers/redux/users-slice'

interface UserRowProps{
    user: User
}

export const UserRow: FC<UserRowProps> = ({ user }) => {
const { id, avatar, first_name, last_name, email, birth_date, gender, role } = user

const changeDefaultAvatar = (avatar: string, gender: string): string => {
    if (avatar) return avatar;

    return gender === "мужской"
      ? new URL("../../assets/doctor-m.png", import.meta.url).toString()
      : new URL("../../assets/doctor-w.png", import.meta.url).toString();
  };

const hasProperty = (property: string) => property ? property : "Не указано"

  return (
    <div className="table-row grid" key={id}>
    <div className="user-info">
      <div
        className="avatar"
        style={{ backgroundImage: `url(${changeDefaultAvatar(avatar, gender)})` }}
      ></div>
      <span className="user-name">
        {first_name} {last_name}
      </span>
    </div>
    <div className="user-email">{email}</div>
    <div className="user-date">
      {hasProperty(birth_date)}
    </div>
    <div className="user-gender">
      {gender ? gender : "Не указано"}
    </div>
    <div className="user-role">
      {role ? role : "Не указано"}
    </div>
    <div className="user-actions">
      <button className="edit-btn">✎</button>
      <button className="delete-btn">🗑</button>
    </div>
  </div>
  )
}
