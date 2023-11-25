import {FC, PropsWithChildren} from 'react'
import {Input, Button} from '../../components'
import {Link} from 'react-router-dom'

type LoginProps = {}

export const Login: FC<PropsWithChildren<LoginProps>> = () => {
    return (
        <div className="flex justify-center items-center h-screen">
          <section className="w-96 h-96 bg-gray-200 p-8 rounded-lg">
            <div className="text-3xl font-bold mb-8">Logo</div>
            <div className="flex flex-col space-y-4 mb-8">
              <div className="flex flex-col">
                <label htmlFor="ID" className="mb-2">
                  ID
                </label>
                <Input 
                placeholder="ID" 
                className="p-2 border rounded" 
                id="ID"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="Password" className="mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Password"
                  className="p-2 border rounded"
                  id="ID"
                />
              </div>
            </div>
            <div className="flex flex-row items-center space-x-10">
              <Link to="/pages/Signup">
                Go to Signup
              </Link>
              <Button
                value="Login"
                onClick={() => console.log('Button clicked')}
              >
              </Button>
              <Link to="/pages/FindId">
                Forget ID/PW?
              </Link>
            </div>
          </section>
        </div>
      );
}
