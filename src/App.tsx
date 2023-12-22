import './App.css'
import {Login, Manager, NotFound, Sidebar} from './pages'

import {Footer} from './components'
import {Route, Routes} from 'react-router-dom'
import {Signup} from './pages/Signup'
import {Main} from './pages/Main'
import {Find} from './pages/Find'
import {BoardRoute, MyPageRoute} from './routers'

//FIXME - 윤서 -Main,Find,Signup pages index파일에 넣어주세요, footer은 공통으로 쓰는 컴포넌트라서 제거하셔도 됩니다

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
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/sigu-up" element={<Signup />} />
                    <Route path="/find-userinfo" element={<Find />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default App
