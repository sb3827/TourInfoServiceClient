import './App.css'
import {Login, Main, Manager, NotFound, Sidebar} from './pages'
import {Footer} from './components'
import {Route, Routes} from 'react-router-dom'
import {AuthRoute, BoardRoute, MyPageRoute, Oauth2Route} from './routers'
import {Signup} from './pages/Signup'
import {Find} from './pages/Find'
import {UserSearch} from './pages/UserSearch'

//FIXME - 윤서 -Main,Find,Signup pages index파일에 넣어주세요, footer은 공통으로 쓰는 컴포넌트라서 제거하셔도 됩니다
//        해창 - UserSearch pages에 있는 index파일에도 추가해주세요.
function App() {
    return (
        <div className="App">
            <Routes>
                <Route element={<Footer />}>
                    <Route element={<Sidebar />}>
                        <Route path="/" element={<Main />} />
                        <Route path="manager" element={<Manager />} />
                        {/* 아직 작성x - 추후 수정 */}
                        <Route path="board/*" element={<BoardRoute />} />
                        <Route path="mypage/*" element={<MyPageRoute />} />
                        <Route path="search-user" element={<UserSearch />} />
                    </Route>
                    <Route element={<AuthRoute />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/sign-up" element={<Signup />} />
                        <Route path="/find-userinfo" element={<Find />} />
                        <Route path="/oauth2" element={<Oauth2Route />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default App
