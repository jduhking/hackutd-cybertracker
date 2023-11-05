import React, { useEffect, useState } from 'react';
import '@pages/popup/Popup.css';
import logo from '@assets/img/logo.png';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

const Popup = () => {
  //const theme = useStorage(exampleThemeStorage);
  const [user, setUser] = useState<
    | {
        name: string;
        email: string;
        pic: string;
      }
    | undefined
  >();

  const [data, setData] = useState<
    | Partial<{
        phishing_links: number;
        score: number;
      }>
    | undefined
  >();

  useEffect(() => {
    chrome.storage.local.get('oauth2').then(oauth => {
      setUser({ name: oauth.oauth.given_name, email: oauth.oauth.email, pic: oauth.oauth.picture });
    });
  }, []);

  const handleLogin = () => {
    chrome.runtime.sendMessage({ greeting: 'hello' }).then(async result => {
      setUser({
        name: result.given_name,
        email: result.email,
        pic: result.picture,
      });
      const res = await fetch(`http://localhost:8000/user/extension_page/${result.email}`);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setData({
          phishing_links: data.phishing_links,
        });
      }
    });
  };
  const openDashboard = () => {
    //PLEASE CHANGE
    chrome.tabs.create({
      url: 'https://152e-129-110-242-17.ngrok-free.app/',
    });
  };

  const handleLogout = async () => {
    const { token } = await chrome.identity.getAuthToken({ interactive: false });

    await fetch(`https://accounts.google.com/o/oauth2/revoke?token=${token}`);
    chrome.identity.removeCachedAuthToken({ token: token }, function () {
      alert('removed');
    });
  };

  return (
    <>
      {user ? (
        <>
          <nav className="bg-[#F01716] text-white">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden gap-2">
                  <button
                    type="button"
                    className="relative inline-flex items-center justify-center rounded-md  text-gray-400  "
                    aria-controls="mobile-menu"
                    aria-expanded="false">
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Open main menu</span>

                    <img src={logo} alt="Logo" className="w-12 h-10" />
                  </button>
                  <div className="text-lg">Cyber View</div>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="dropdown inline-block relative">
                    <button
                      type="button"
                      className="relative flex rounded-full bg-gray-800 text-sm "
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true">
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full" src={user?.pic} alt="" />
                    </button>
                    <ul className="dropdown-menu absolute right-0 hidden text-gray-700 pt-1">
                      <li className="">
                        <button
                          className="rounded bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                          onClick={() => handleLogout()}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <div className="pb-5">
            <div className="p-2 text-lg font-semibold">Hello, {user?.name}</div>
            <div>
              <div className="mx-auto text-center text-lg font-medium">Cyber Safety Score</div>
              <div className="mx-auto text-center text-5xl font-semibold">83%</div>
            </div>

            <div>
              <div className="mx-auto text-center text-lg font-medium">Phishing Links Clicked</div>
              <div className="mx-auto text-center text-5xl font-semibold">{data?.phishing_links}</div>
            </div>

            <div className="mx-auto text-center text-lg font-medium">See a more detailed breakdown</div>
            <div className="text-center">
              <button
                className="bg-[#F01716] px-14 py-2 text-center mt-3 rounded-full text-white text-lg"
                onClick={() => openDashboard()}>
                Dashboard
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="px-6 sm:px-0 max-w-sm">
            <button
              type="button"
              onClick={() => handleLogin()}
              className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
              <svg
                className="mr-2 -ml-1 w-4 h-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512">
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
              Sign up with Google<div></div>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
