import './App.css'
import {Find, Login, Main, Manager, NotFound, Sidebar, Signup, UserSearch} from './pages'
import {Footer, Logo} from './components'
import {Route, Routes} from 'react-router-dom'
import {AuthRoute, BoardRoute, ManagerRoute, MyPageRoute, Oauth2Route} from './routers'

function App() {
    return (
        <div className="App min-w-[1024px]">
            <Routes>
                <Route
                    element={
                        <>
                            <Logo />
                            <Footer />
                        </>
                    }>
                    <Route element={<Sidebar />}>
                        <Route path="/" element={<Main />} />
                        <Route element={<ManagerRoute />}>
                            <Route path="manager" element={<Manager />} />
                        </Route>
                        {/* 아직 작성x - 추후 수정 */}
                        <Route path="board/*" element={<BoardRoute />} />
                        <Route path="mypage/*" element={<MyPageRoute />} />
                        <Route path="search-user" element={<UserSearch />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                    <Route element={<AuthRoute />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/sign-up" element={<Signup />} />
                        <Route path="/find-userinfo" element={<Find />} />
                        <Route path="/oauth2" element={<Oauth2Route />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App
