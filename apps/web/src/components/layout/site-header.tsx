"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";


import { HiOutlineUserCircle } from "react-icons/hi2";

export function SiteHeader() {
  return (
    <nav className="shadow-md rounded-b-2xl border-t-2 border-pink-400 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-16">

          {/* 🔹 Logo + Brand */}
          <div className="flex items-center space-x-3">
            <Link href="/">
              <img
                src="/images/logo.png"
                alt="logo"
                className="h-20 w-auto object-contain"
              />
            </Link>
          </div>

          {/* 🔹 Menu */}
          <div className="hidden md:flex items-center space-x-8 text-gray-700 text-sm font-medium">
            <Link href="/" className="hover:text-pink-500 transition">
              Home
            </Link>

            <Link href="/vendors" className="hover:text-pink-500 transition">
              Vendors
            </Link>

            <Link href="/#" className="hover:text-pink-500 transition">
              Categories
            </Link>

            <Link href="/how-it-works" className="hover:text-pink-500 transition">
              How It Works
            </Link>

            <Link href="/create-listing" className="hover:text-pink-500 transition">
              Blog
            </Link>

            <Link href="/contact-us" className="hover:text-pink-500 transition">
              Contact
            </Link>
          </div>

          {/* 🔹 Right Side */}
          {/* 🔹 Right Side */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="flex items-center gap-2 text-gray-700 transition hover:text-pink-500"
            >
              <HiOutlineUserCircle aria-hidden="true" className="text-[22px]" />
              <span>Login</span>
            </Link>

            <Link
              href="/signup"
              className="rounded-full bg-pink-500 px-5 py-2 font-medium text-white transition hover:bg-pink-600"
            >
              Sign Up
            </Link>
          </div>

        </div>
      </div>

    </nav>
  );
};