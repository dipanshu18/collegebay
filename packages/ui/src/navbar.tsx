"use client";

import Link from "next/link";
import React, { useState } from "react";
import { PrimaryBtn } from "./primaryBtn";
import { SecondaryBtn } from "./secondaryBtn";

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
    <nav className="max-w-2xl lg:max-w-3xl mx-auto navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
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
                  <Link
                    key={index}
                    href={itemContent.link}
                    onClick={() => setShowing(!showing)}
                    className="btn btn-ghost text-md hover:text-primary-content"
                  >
                    {itemContent.item}
                  </Link>
                );
              })}

            {user && user ? (
              <Link
                href="/"
                className="text-center my-2"
                onClick={() => setShowing(!showing)}
              >
                <PrimaryBtn text="Logout" />
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-center my-2"
                onClick={() => setShowing(!showing)}
              >
                <SecondaryBtn text="Login" />
              </Link>
            )}
          </ul>
        </div>

        <div className="hidden lg:block">
          {navItems &&
            navItems.map((itemContent: navItemType) => {
              return (
                <Link
                  href={itemContent.link}
                  onClick={() => setShowing(!showing)}
                  className="btn btn-ghost text-md hover:text-primary-content"
                >
                  {itemContent.item}
                </Link>
              );
            })}
        </div>
      </div>

      <div className="navbar-center">
        <Link href="/" className="btn btn-ghost text-xl">
          CollegeBay
        </Link>
      </div>

      <div className="navbar-end invisible lg:visible">
        {user && user ? (
          <Link href="/" onClick={() => setShowing(!showing)}>
            <PrimaryBtn text="Logout" />
          </Link>
        ) : (
          <Link href="/login" onClick={() => setShowing(!showing)}>
            <SecondaryBtn text="Login" />
          </Link>
        )}
      </div>
    </nav>
  );
}
