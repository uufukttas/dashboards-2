import { Button } from "@projects/button"
import { Label } from "@projects/label"
import { Input } from "@projects/input"
import './page.css';

export default async function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div className="container w-full max-w-xs">
      <form className="form-container bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="input-container mb-4">
          <Label labelText="Username" htmlFor="username" className="label block text-gray-700 text-sm font-bold mb-2" />
          <Input name="username" type="text" id="username" placeholder="Username" className="input-element shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="input-container mb-6">
          <Label labelText="Password" htmlFor="password" className="label block text-gray-700 text-sm font-bold mb-2" />
          <Input name="password" type="password" id="password" placeholder="******************" className="input-element shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
          <p className="parapgraph-element text-red-500 text-xs italic">Please choose a password.</p>
        </div>
        <div className="actions-container flex items-center justify-between">
          <Button type="button" buttonText="Sign In" className="signin-button" />
          <a className="forget-password inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}
