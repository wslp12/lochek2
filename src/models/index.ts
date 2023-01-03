type Character = {
  display: boolean;
  groupSetName: string;
  itemLevel: number;
  job: string;
  jobIcon: string;
  jobProfileSrc: string;
  level: number;
  name: string;
  profileSrc: string;
  order: number;
};

type Raid = {
  name: string;
  srcName: string;
  level: number;
  gold: number;
  groupName: string;
  order: number;
};
type AccountRaid = {
  name: string;
  srcName: string;
  level: number;
  gold: number;
  groupName: string;
  order: number;
}

type WeekAccountRaid = {
  order: number,
  name: string,
  gold: number,
  groupName: string;
  level: number;
  srcName: string;
  type: 'week' | 'day'
}

type TodoState = {
  id: string | number;
  characterName: string;
  done: boolean;
  doneTime: string;
  display: boolean;
};

type AccountTodoState = {
  id: string | number;
  done: boolean;
  doneTime: string;
  display: boolean;
  user: UserInfo;
};

type Todo = TodoState & { raid: Raid };
type AccountTodo = AccountTodoState & { weekAccountRaid: WeekAccountRaid }

type UserInfo = {
  name: string;
  token: string;
  todoList: Todo[];
  profileSrc: string;
  characterList: Character[];
}

type OrganizationList = {
  id: number;
  name: string;
  profileSrc: string;
  userName: string;
  guserName: string;
};


export type { Character, UserInfo, TodoState, Todo, Raid, OrganizationList, AccountTodo, AccountRaid }