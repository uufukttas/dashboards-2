import './Form.scss';
import { Button } from "@projects/button";
import { Input } from "@projects/input";
import { Label } from "@projects/label";
/* eslint-disable-next-line */
export interface FormProps {
  className?: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
 }

export function Form({
  className,
  onClick,
}: FormProps) {
  return (
    <div className="sh-card-form-container">
      <form className="sh-card-form-container">
        <div className="mb-4">
          <Label
            className="block text-sm font-medium text-gray-600"
            htmlFor="username"
            labelText="Username"
          />
          <Input
            className={`mt-1 p-2 w-full border`}
            id="username"
            name="username"
            type="text"
          />
        </div>
        <div className="mb-4">
          <Label
            className="block text-sm font-medium text-gray-600"
            htmlFor="password"
            labelText="Password"
          />
          <Input
            className={`mt-1 p-2 w-full border`}
            id="password"
            name="password"
            type="password"
          />
        </div>
        <div className="button-container">
          <Button
            buttonText="Submit"
            className={`sh-login-button p-2 w-full`}
            type="submit"
            onClick={onClick}
          />
        </div>
      </form>
    </div>
  );
}

export default Form;
