'use client';

import { Image } from '@projects/image';
import { userInfo } from "../../constants/styles";
import { Label } from "@projects/label";
import { Input } from "@projects/input";
import { Button } from "@projects/button";

interface CardProps {}

export function Card(props: CardProps) {
  return (
    <>
      <div className={`sh-card-container items-center justify-center p-8 rounded shadow-custom w-full`}>
        <div className="sh-card-header-container flex items-center w-full justify-between">
          <div className="sh-card-title-container">
            <h2 className="sh-card-title-text text-2xl font-semibold mb-6">{userInfo.name}</h2>
          </div>
          <div className="sh-card-logo-container">
            <Image alt={`${userInfo.name} logo`} className="sh-card-logo" src={userInfo.logo} />
          </div>
        </div>
        <div className="sh-card-body-container">
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
                  className={`p-2 w-full`}
                  type="submit"
                  onClick={() => {}}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="sh-card-footer-container mt-4">
          <div className="sh-card-footer-text-container">
            <p className="sh-card-footer-text italic text-center">SHARZNET</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
