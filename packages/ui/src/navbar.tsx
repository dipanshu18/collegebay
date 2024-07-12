"use client";

import Link from "next/link";
import React, { useState } from "react";
import { PrimaryBtn } from "./primaryBtn";
import { SecondaryBtn } from "./secondaryBtn";
import { FaUser } from "react-icons/fa6";

interface navItemType {
  item: string;
  link: string;
}

type userType = string | null;

export function Navbar({
  navItems,
  user,
}: {
  navItems: navItemType[];
  user: userType;
}) {
  const [showing, setShowing] = useState(false);

  return (
    <nav className="navbar max-w-2xl lg:max-w-7xl mx-auto">
      <div className="navbar-start">
        <div className="dropdown xl:hidden">
          <div
            tabIndex={0}
            onClick={() => setShowing(!showing)}
            role="button"
            aria-label="menu"
            className="btn btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className={
              showing
                ? "menu menu-sm dropdown-content mt-3 z-[1] p-4 bg-base-300 shadow-2xl rounded-box w-52"
                : "hidden"
            }
          >
            {navItems &&
              navItems.map((itemContent, index) => {
                return (
                  <li key={index}>
                    <Link
                      href={itemContent.link}
                      onClick={() => setShowing(!showing)}
                      className="hover:text-primary"
                    >
                      {itemContent.item}
                    </Link>
                  </li>
                );
              })}

            {user && user ? (
              <>
                <li>
                  <Link
                    href="/profile"
                    className="hover:text-primary"
                    onClick={() => setShowing(!showing)}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/user-posts"
                    className="hover:text-primary"
                    onClick={() => setShowing(!showing)}
                  >
                    Your listings
                  </Link>
                </li>
                <li>
                  <Link href="/" onClick={() => setShowing(!showing)}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="text-center my-2 w-full"
                  onClick={() => setShowing(!showing)}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="hidden xl:flex gap-5">
          {navItems &&
            navItems.map((itemContent, index) => {
              return (
                <Link
                  key={index}
                  href={itemContent.link}
                  onClick={() => setShowing(!showing)}
                  className="hover:text-primary"
                >
                  {itemContent.item}
                </Link>
              );
            })}
        </div>
      </div>

      <div className="navbar-center">
        <Link
          href={user ? "/dashboard" : "/"}
          className="btn btn-ghost text-xl"
        >
          CollegeBay
        </Link>
      </div>

      <div className="navbar-end invisible xl:visible">
        {user && user ? (
          <div className="flex gap-4">
            <div className="flex-none">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  onClick={() => setShowing(!showing)}
                  aria-label="menu"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="bg-slate-300 p-2 rounded-full">
                    <FaUser />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className={
                    showing
                      ? "menu menu-sm dropdown-content mt-3 z-[1] p-4 bg-base-300 shadow-2xl rounded-box w-52"
                      : "hidden"
                  }
                >
                  <li>
                    <Link href="/profile" onClick={() => setShowing(!showing)}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/user-posts"
                      onClick={() => setShowing(!showing)}
                    >
                      Your listings
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <Link href="/" onClick={() => setShowing(!showing)}>
              <PrimaryBtn text="Logout" />
            </Link>
          </div>
        ) : (
          <Link href="/login" onClick={() => setShowing(!showing)}>
            <PrimaryBtn text="Login" />
          </Link>
        )}
      </div>
    </nav>
  );
}
