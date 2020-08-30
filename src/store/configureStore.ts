import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducer';
import { composeWithDevTools } from 'redux-devtools-extension'

const configureStore  = () => {
  const middleWares : any = [];

    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middleWares))
    // production 일 때는, DevTools를 사용하지 않는다.
    : composeWithDevTools(applyMiddleware(...middleWares))
    // applyMiddleware는 미들웨어(saga) 를 적용시켜준다
    // middleWare는 스프레드를 사용해서 넣어줘야한다 (배열이 들어가면 안됨)
    // development 일 때는, DevTools를 사용한다.

    const store = createStore(rootReducer, enhancer);
    
    return store;
}

export default configureStore;