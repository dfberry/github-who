
export interface IUser {
    token: object,
    user: object,
    isAuthenticated: boolean,
    error: string
}

export type UserState = {
    user: IUser
}

export type UserAction = {
    type: string
    user: IUser
}

export type DispatchType = (args: UserAction) => UserAction

export const ADD_USER = "ADD_USER"
export const REMOVE_USER = "REMOVE_USER"


export const ADD_ARTICLE = "ADD_ARTICLE"
export const REMOVE_ARTICLE = "REMOVE_ARTICLE"

export function addUser(user: IUser) {
    const action: UserAction = {
        type: ADD_USER,
        user,
    }
}

export function removeUser(user: IUser) {
    const action: UserAction = {
        type: REMOVE_USER,
        user,
    }
}

export function simulateHttpRequest(action: UserAction) {
    return (dispatch: DispatchType) => {
        setTimeout(() => {
            dispatch(action)
        }, 500)
    }
}

export const initialState: UserState = {
    user: {
        token: {},
        user:{},
        isAuthenticated: false,
        error: ""
    }
}

export const reducer = (
    state: UserState = initialState,
    action: UserAction
  ): UserState => {
    switch (action.type) {
      case ADD_USER:
        const user: IUser = {
          token: action.user.token,
          user: action.user.user,
          isAuthenticated: action.user.isAuthenticated,
          error: action.user.error
        }
        return {
          ...state,
          user: user,
        }
      case REMOVE_USER:

        const emptyUser: IUser = {
            token: {},
            user: {},
            isAuthenticated: false,
            error: ""
          }      

        return {
          ...state,
          user: emptyUser,
        }
    }
    return state
  }