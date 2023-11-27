import {FC, useState} from 'react'
import {
    MDBContainer,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBCol,
    MDBCardBody,
    MDBCard
} from 'mdb-react-ui-kit'
import {Title} from '../../components'
type LoginType = {}

export const Login: FC<LoginType> = () => {
    const [userId, setUserId] = useState<string>('')
    const [userPassword, setUserPassword] = useState<string>('')

    function onUserIdChange(value: string) {
        setUserId(value)
    }
    function onUserPasswordChange(value: string) {
        setUserPassword(value)
    }

    return (
        <div className="box-border flex flex-col items-center justify-center w-full h-screen">
            {/* 로고 수정필요 */}
            <Title className="hidden font-extrabold md:block ">야! 먹고놀자</Title>

            <MDBContainer className="flex items-center justify-center">
                <MDBRow className="w-11/12">
                    <MDBCol
                        md="6"
                        className="p-5 text-center text-md-start d-flex flex-column justify-content-center">
                        <img
                            src="https://images.unsplash.com/photo-1655722723663-75b47de17a31?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Login image"
                            className="hidden w-full rounded-lg md:block h-fit opacity-90"
                            style={{objectFit: 'cover', objectPosition: 'left'}}
                        />
                    </MDBCol>
                    <MDBCol md="6">
                        <MDBCard className="my-5">
                            <MDBCardBody className="p-5">
                                <h2 className="hidden mb-5 md:block">LOGIN</h2>
                                <Title className="mb-5 md:hidden">야! 먹고놀자</Title>
                                <MDBInput
                                    wrapperClass="mb-4 "
                                    label="ID"
                                    id="form1"
                                    type="email"
                                    value={userId}
                                    onChange={e => onUserIdChange(e.target.value)}
                                    size="lg"
                                />
                                <MDBInput
                                    wrapperClass=" mb-4"
                                    label="Password"
                                    id="form1"
                                    type="password"
                                    value={userPassword}
                                    onChange={e => onUserPasswordChange(e.target.value)}
                                    size="lg"
                                />

                                <MDBBtn className="mb-4 w-100" size="lg">
                                    로그인
                                </MDBBtn>
                                <MDBBtn className="mb-4 w-100" size="lg">
                                    회원가입
                                </MDBBtn>

                                <div className="my-4 divider d-flex align-items-center">
                                    <p className="mx-3 mb-0 text-center fw-bold">OR</p>
                                </div>

                                <MDBBtn
                                    className="mb-4 w-100"
                                    size="lg"
                                    style={{backgroundColor: '#dd4b39'}}>
                                    <MDBIcon fab icon="google" className="mx-2" />
                                    Continue with Google
                                </MDBBtn>
                                <MDBBtn
                                    className="mb-4 w-100"
                                    size="lg"
                                    style={{backgroundColor: '#2db400'}}>
                                    <MDBIcon fab icon="n" className="mx-2" />
                                    Continue with naver
                                </MDBBtn>
                                <p className="pr-1 text-sm cursor-pointer text-end hover:font-bold">
                                    아이디/비밀번호 찾기
                                </p>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}
