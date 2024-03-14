"use client";

import { useAuthModal } from "@/store/use-auth-modal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { plans } from "@/constants/tier";

export default function Pricing() {
  const { set } = useAuthModal();

  const { data: session } = useSession();

  const router = useRouter();

  return (
    <div className="mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-20">
      <div className="mb-10 max-w-xl sm:text-center md:mx-auto md:mb-12 lg:max-w-2xl">
        <div>
          <p className="bg-teal-accent-400 mb-4 inline-block rounded-full px-3 py-px text-xs font-semibold uppercase tracking-wider text-teal-900">
            Our Pricing
          </p>
        </div>
        <h2 className="mb-6 max-w-lg font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="text-blue-gray-100 absolute left-0 top-0 z-0 -ml-20 -mt-8 hidden w-32 sm:block lg:-ml-28 lg:-mt-10 lg:w-32"
            >
              <defs>
                <pattern
                  id="ace59d72-08d5-4850-b9e4-d9d0b86c0525"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#ace59d72-08d5-4850-b9e4-d9d0b86c0525)"
                width="52"
                height="24"
              />
            </svg>
            <span className="relative">Transparent</span>
          </span>{" "}
          pricing. Pay as you grow.
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          Explore the best of TaskMaker
        </p>
      </div>
      <div className="mx-auto grid max-w-md gap-10 sm:row-span-10 lg:max-w-screen-md lg:grid-cols-2">
        <div className="flex flex-col justify-between rounded border bg-white p-5 shadow-sm lg:w-96">
          <div className="mb-6">
            <div className="mb-6 flex items-center justify-between border-b pb-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider">
                  Personal use
                </p>
                <p className="text-5xl font-extrabold">Free</p>
              </div>
              <div className="bg-blue-gray-50 flex h-24 w-24 items-center justify-center rounded-full">
                <svg
                  className="h-10 w-10 text-gray-600"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeWidth="2"
                >
                  <path
                    d="M12,7L12,7 c-1.657,0-3-1.343-3-3v0c0-1.657,1.343-3,3-3h0c1.657,0,3,1.343,3,3v0C15,5.657,13.657,7,12,7z"
                    fill="none"
                    stroke="currentColor"
                  />
                  <path
                    d="M15,23H9v-5H7v-6 c0-1.105,0.895-2,2-2h6c1.105,0,2,0.895,2,2v6h-2V23z"
                    fill="none"
                    stroke="currentColor"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="mb-2 font-bold tracking-wide">Features</p>
              <ul className="space-y-2">
                {plans.free.map((plan, index) => (
                  <li className="flex items-center" key={index}>
                    <div className="mr-2">
                      <svg
                        className="text-deep-purple-accent-400 h-4 w-4"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeWidth="2"
                      >
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          points="6,12 10,16 18,8"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          fill="none"
                          r="11"
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="font-medium text-gray-800">{plan.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                if (!session?.user.id) {
                  set({ open: true });
                }

                void router.push(`/select-organization`);
              }}
              className="group relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-white font-medium"
            >
              <div className="inline-flex h-12 translate-y-0 items-center justify-center px-6 text-neutral-950 transition duration-500 group-hover:translate-y-[150%]">
                Start for free
              </div>
              <div className="absolute inline-flex h-24 w-full translate-y-[100%] items-center justify-center text-neutral-50 transition duration-500 group-hover:translate-y-0">
                <span className="absolute size-full translate-y-full skew-y-12 scale-y-0 bg-gradient-to-r from-fuchsia-600 to-pink-600 transition duration-500 group-hover:translate-y-0 group-hover:scale-150" />
                <span className="z-10">Start for free</span>
              </div>
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-between rounded border bg-white p-5 shadow-sm lg:w-96">
          <div className="mb-6">
            <div className="mb-6 flex items-center justify-between border-b pb-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider">
                  For your team
                </p>
                <p className="text-5xl font-extrabold">$0.99</p>
              </div>
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-50">
                <svg
                  className="text-deep-purple-accent-400 h-10 w-10"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeWidth="2"
                >
                  <path
                    d="M4,7L4,7 C2.895,7,2,6.105,2,5v0c0-1.105,0.895-2,2-2h0c1.105,0,2,0.895,2,2v0C6,6.105,5.105,7,4,7z"
                    fill="none"
                    stroke="currentColor"
                  />
                  <path
                    d="M6,21H3v-4 l-2,0v-5c0-1.105,0.895-2,2-2h1"
                    fill="none"
                    stroke="currentColor"
                  />
                  <path
                    d="M20,7L20,7 c1.105,0,2-0.895,2-2v0c0-1.105-0.895-2-2-2h0c-1.105,0-2,0.895-2,2v0C18,6.105,18.895,7,20,7z"
                    fill="none"
                    stroke="currentColor"
                  />
                  <path
                    d="M18,21h3v-4 l2,0v-5c0-1.105-0.895-2-2-2h-1"
                    fill="none"
                    stroke="currentColor"
                  />
                  <path
                    d="M12,7L12,7 c-1.657,0-3-1.343-3-3v0c0-1.657,1.343-3,3-3h0c1.657,0,3,1.343,3,3v0C15,5.657,13.657,7,12,7z"
                    fill="none"
                    stroke="currentColor"
                  />
                  <path
                    d="M15,23H9v-6H7v-5 c0-1.105,0.895-2,2-2h6c1.105,0,2,0.895,2,2v6h-2V23z"
                    fill="none"
                    stroke="currentColor"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="mb-2 font-bold tracking-wide">Features</p>
              <ul className="space-y-2">
                {plans.pro.map((plan, index) => (
                  <li className="flex items-center" key={index}>
                    <div className="mr-2">
                      <svg
                        className="text-deep-purple-accent-400 h-4 w-4"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeWidth="2"
                      >
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          points="6,12 10,16 18,8"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          fill="none"
                          r="11"
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="font-medium text-gray-800">{plan.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                if (!session?.user.id) {
                  set({ open: true });
                }
                void router.push(`/select-organization`);
              }}
              className="group relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 transition hover:scale-110"
            >
              <span>Get started</span>
              <div className="absolute inset-0 flex size-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
