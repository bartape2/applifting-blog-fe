import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import store from './store/store'
import { Provider } from 'react-redux';
import About from './components/About';
import Articles from './components/Articles';
import ArticlePage from './components/article/ArticlePage';
import MyArticles from './components/admin/MyArticles';
import AdminRoute from './components/admin/AdminRoute';
import CreateArticle from './components/admin/CreateArticle';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App />}>
                        <Route index element={<Articles />} />
                        <Route path='about' element={<About />} />
                        <Route path='article/:articleId' element={<ArticlePage />} />
                        <Route path='admin/' element={<AdminRoute />}>
                            <Route path='my-articles' element={<MyArticles />} />
                            <Route path='new-article' element={<CreateArticle />} />
                            <Route path='edit-article/:articleId' element={<CreateArticle />} />
                        </Route>
                        <Route
                            path='*'
                            element={
                                <div>
                                    <h3>404: Page not found!</h3>
                                </div>
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    
    document.getElementById('root')
);
