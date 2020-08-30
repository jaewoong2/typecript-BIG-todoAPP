export const THEME_CHANGE = 'THEME_CHANGE' as const;

type ThemeAction = {
    type : 'THEME_CHANGE'
}

type ThemeState = {
    theme : boolean;
}

const initialState : ThemeState = {
    theme : false,
}

function theme(state: ThemeState = initialState, action: ThemeAction) {
    switch (action.type) {
        case THEME_CHANGE :
            return {
                ...state,
                theme : !state.theme 
            }; 
      default:
        return state;
    }
  }
  
  export default theme;