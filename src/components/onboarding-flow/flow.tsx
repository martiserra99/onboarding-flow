import type { Flow, s } from "@formity/react";
import type { FormStatus } from "./types/status";

import { MonitorIcon, ServerIcon, SmartphoneIcon } from "lucide-react";

import { ReactIcon } from "@/src/components/ui/icons/react-icon";
import { VueIcon } from "@/src/components/ui/icons/vue-icon";
import { AngularIcon } from "@/src/components/ui/icons/angular-icon";
import { SvelteIcon } from "@/src/components/ui/icons/svelte-icon";
import { NodejsIcon } from "@/src/components/ui/icons/nodejs-icon";
import { PythonIcon } from "@/src/components/ui/icons/python-icon";
import { GoIcon } from "@/src/components/ui/icons/go-icon";
import { JavaIcon } from "@/src/components/ui/icons/java-icon";
import { ReactNativeIcon } from "@/src/components/ui/icons/react-native-icon";
import { FlutterIcon } from "@/src/components/ui/icons/flutter-icon";
import { SwiftIcon } from "@/src/components/ui/icons/swift-icon";
import { KotlinIcon } from "@/src/components/ui/icons/kotlin-icon";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form } from "./components/form";

export type Schema = {
  render: {
    progress: {
      numberSteps: number;
      currentStep: number;
    };
    form: React.ReactNode;
  };
  struct: [
    s.Form<{
      learn: string;
      level: string;
      hours: string;
    }>,
    s.Variables<{
      technology: string;
      motivation: string;
    }>,
    s.Switch<{
      branches: [
        [
          s.Form<{
            technology: string;
            motivation: string;
          }>,
        ],
        [
          s.Form<{
            technology: string;
            motivation: string;
          }>,
        ],
      ];
      default: [
        s.Form<{
          technology: string;
          motivation: string;
        }>,
      ];
    }>,
    s.Form<{
      format: string;
      environment: string;
      reminders: boolean;
    }>,
    s.Return<{
      learn: string;
      level: string;
      hours: string;
      technology: string;
      motivation: string;
      format: string;
      environment: string;
      reminders: boolean;
    }>,
  ];
  inputs: Record<never, never>;
  params: {
    status: FormStatus;
    onStatusChange: (status: FormStatus) => void;
  };
};

export const flow: Flow<Schema> = [
  {
    form: {
      fields: () => ({
        learn: ["", []],
        level: ["", []],
        hours: ["", []],
      }),
      render: ({ fields, params, next, back }) => ({
        progress: {
          numberSteps: 3,
          currentStep: 1,
        },
        form: (
          <Form
            id="basics"
            defaultValues={fields}
            resolver={zodResolver(
              z.object({
                learn: z.string().nonempty(),
                level: z.string().nonempty(),
                hours: z.string().nonempty(),
              }),
            )}
            eyebrow="Step 1 of 3"
            heading="What are your learning goals?"
            message="We'll personalise your path based on your answers."
            content={[
              {
                type: "cardChoice",
                name: "learn",
                label: "What do you want to learn?",
                options: [
                  {
                    icon: <MonitorIcon className="size-6" />,
                    label: "Frontend Development",
                    value: "frontend",
                  },
                  {
                    icon: <ServerIcon className="size-6" />,
                    label: "Backend Development",
                    value: "backend",
                  },
                  {
                    icon: <SmartphoneIcon className="size-6" />,
                    label: "Mobile Development",
                    value: "mobile",
                  },
                ],
              },
              {
                type: "pillChoice",
                name: "level",
                label: "Current experience level",
                options: [
                  { label: "Just starting out", value: "just-starting-out" },
                  { label: "Know the basics", value: "know-the-basics" },
                  { label: "Comfortable", value: "comfortable" },
                  { label: "Advanced", value: "advanced" },
                ],
              },
              {
                type: "pillChoice",
                name: "hours",
                label: "Weekly learning time",
                options: [
                  { label: "1-2 hours", value: "1-2-hours" },
                  { label: "3-5 hours", value: "3-5-hours" },
                  { label: "6-10 hours", value: "6-10-hours" },
                  { label: "10+ hours", value: "10-plus-hours" },
                ],
              },
            ]}
            buttons={{
              back: null,
              next: "Continue",
            }}
            onBack={back}
            onNext={next}
            status={params.status}
            onStatusChange={params.onStatusChange}
          />
        ),
      }),
    },
  },
  {
    variables: () => ({
      technology: "",
      motivation: "",
    }),
  },
  {
    switch: {
      branches: [
        {
          case: ({ learn }) => learn === "frontend",
          then: [
            {
              form: {
                fields: () => ({
                  technology: ["", []],
                  motivation: ["", []],
                }),
                render: ({ fields, params, next, back }) => ({
                  progress: {
                    numberSteps: 3,
                    currentStep: 2,
                  },
                  form: (
                    <Form
                      id="technology/frontend"
                      defaultValues={fields}
                      resolver={zodResolver(
                        z.object({
                          technology: z.string().nonempty(),
                          motivation: z.string().nonempty(),
                        }),
                      )}
                      eyebrow="Step 2 of 3"
                      heading="Which tool do you want to learn?"
                      message="Pick the one you're most excited to dig into."
                      content={[
                        {
                          type: "techChoice",
                          name: "technology",
                          label: "Choose your technology",
                          options: [
                            {
                              icon: <ReactIcon />,
                              label: "React",
                              hint: "The most popular UI library for building web interfaces",
                              value: "react",
                            },
                            {
                              icon: <VueIcon />,
                              label: "Vue",
                              hint: "A progressive framework that's approachable and versatile",
                              value: "vue",
                            },
                            {
                              icon: <AngularIcon />,
                              label: "Angular",
                              hint: "A complete platform for enterprise-scale web apps",
                              value: "angular",
                            },
                            {
                              icon: <SvelteIcon />,
                              label: "Svelte",
                              hint: "No virtual DOM — compiles to vanilla JS at build time",
                              value: "svelte",
                            },
                          ],
                        },
                        {
                          type: "pillChoice",
                          name: "motivation",
                          label: "Your main motivation",
                          options: [
                            {
                              label: "Land a job",
                              value: "land-a-job",
                            },
                            {
                              label: "Build a project",
                              value: "build-a-project",
                            },
                            {
                              label: "Upskill at work",
                              value: "upskill-at-work",
                            },
                            {
                              label: "Pure curiosity",
                              value: "pure-curiosity",
                            },
                          ],
                        },
                      ]}
                      buttons={{
                        back: "Back",
                        next: "Continue",
                      }}
                      onBack={back}
                      onNext={next}
                      status={params.status}
                      onStatusChange={params.onStatusChange}
                    />
                  ),
                }),
              },
            },
          ],
        },
        {
          case: ({ learn }) => learn === "backend",
          then: [
            {
              form: {
                fields: () => ({
                  technology: ["", []],
                  motivation: ["", []],
                }),
                render: ({ fields, params, next, back }) => ({
                  progress: {
                    numberSteps: 3,
                    currentStep: 2,
                  },
                  form: (
                    <Form
                      id="technology/backend"
                      defaultValues={fields}
                      resolver={zodResolver(
                        z.object({
                          technology: z.string().nonempty(),
                          motivation: z.string().nonempty(),
                        }),
                      )}
                      eyebrow="Step 2 of 3"
                      heading="Which tool do you want to learn?"
                      message="Pick the one you're most excited to dig into."
                      content={[
                        {
                          type: "techChoice",
                          name: "technology",
                          label: "Choose your technology",
                          options: [
                            {
                              icon: <NodejsIcon />,
                              label: "Node.js",
                              hint: "The JavaScript runtime for server-side development",
                              value: "nodejs",
                            },
                            {
                              icon: <PythonIcon />,
                              label: "Python",
                              hint: "Versatile language great for backend, data, and AI",
                              value: "python",
                            },
                            {
                              icon: <GoIcon />,
                              label: "Go",
                              hint: "Built for speed and simplicity at any given scale",
                              value: "go",
                            },
                            {
                              icon: <JavaIcon />,
                              label: "Java",
                              hint: "Battle-tested for enterprise backend systems",
                              value: "java",
                            },
                          ],
                        },
                        {
                          type: "pillChoice",
                          name: "motivation",
                          label: "Your main motivation",
                          options: [
                            {
                              label: "Land a job",
                              value: "land-a-job",
                            },
                            {
                              label: "Build a project",
                              value: "build-a-project",
                            },
                            {
                              label: "Upskill at work",
                              value: "upskill-at-work",
                            },
                            {
                              label: "Pure curiosity",
                              value: "pure-curiosity",
                            },
                          ],
                        },
                      ]}
                      buttons={{
                        back: "Back",
                        next: "Continue",
                      }}
                      onBack={back}
                      onNext={next}
                      status={params.status}
                      onStatusChange={params.onStatusChange}
                    />
                  ),
                }),
              },
            },
          ],
        },
      ],
      default: [
        {
          form: {
            fields: () => ({
              technology: ["", []],
              motivation: ["", []],
            }),
            render: ({ fields, params, next, back }) => ({
              progress: {
                numberSteps: 3,
                currentStep: 2,
              },
              form: (
                <Form
                  id="technology/mobile"
                  defaultValues={fields}
                  resolver={zodResolver(
                    z.object({
                      technology: z.string().nonempty(),
                      motivation: z.string().nonempty(),
                    }),
                  )}
                  eyebrow="Step 2 of 3"
                  heading="Which tool do you want to learn?"
                  message="Pick the one you're most excited to dig into."
                  content={[
                    {
                      type: "techChoice",
                      name: "technology",
                      label: "Choose your technology",
                      options: [
                        {
                          icon: <ReactNativeIcon />,
                          label: "React Native",
                          hint: "Build mobile apps with React for iOS and Android",
                          value: "react-native",
                        },
                        {
                          icon: <FlutterIcon />,
                          label: "Flutter",
                          hint: "Google's UI toolkit for cross-platform mobile apps",
                          value: "flutter",
                        },
                        {
                          icon: <SwiftIcon />,
                          label: "Swift",
                          hint: "Apple's language for native iOS and macOS apps",
                          value: "swift",
                        },
                        {
                          icon: <KotlinIcon />,
                          label: "Kotlin",
                          hint: "Modern language for native Android development",
                          value: "kotlin",
                        },
                      ],
                    },
                    {
                      type: "pillChoice",
                      name: "motivation",
                      label: "Your main motivation",
                      options: [
                        { label: "Land a job", value: "land-a-job" },
                        { label: "Build a project", value: "build-a-project" },
                        { label: "Upskill at work", value: "upskill-at-work" },
                        { label: "Pure curiosity", value: "pure-curiosity" },
                      ],
                    },
                  ]}
                  buttons={{
                    back: "Back",
                    next: "Continue",
                  }}
                  onBack={back}
                  onNext={next}
                  status={params.status}
                  onStatusChange={params.onStatusChange}
                />
              ),
            }),
          },
        },
      ],
    },
  },
  {
    form: {
      fields: () => ({
        format: ["", []],
        environment: ["", []],
        reminders: [false, []],
      }),
      render: ({ fields, params, next, back }) => ({
        progress: {
          numberSteps: 3,
          currentStep: 3,
        },
        form: (
          <Form
            id="approach"
            defaultValues={fields}
            resolver={zodResolver(
              z.object({
                format: z.string().nonempty(),
                environment: z.string().nonempty(),
                reminders: z.boolean(),
              }),
            )}
            eyebrow="Step 3 of 3"
            heading="How do you like to learn?"
            message="We'll adapt the experience to fit your style."
            content={[
              {
                type: "pillChoice",
                name: "format",
                label: "Preferred learning format",
                options: [
                  { label: "Video tutorials", value: "video-tutorials" },
                  { label: "Text guides", value: "text-guides" },
                  { label: "Hands-on projects", value: "hands-on-projects" },
                  { label: "Guided courses", value: "guided-courses" },
                ],
              },
              {
                type: "cardChoice",
                name: "environment",
                label: "Learning environment",
                options: [
                  { label: "On my own", value: "on-my-own" },
                  { label: "With others", value: "with-others" },
                ],
              },
              {
                type: "switch",
                name: "reminders",
                label: "Daily reminders",
                hint: "Get a daily nudge to keep your learning streak going.",
              },
            ]}
            buttons={{
              back: "Back",
              next: "Build my path",
            }}
            onBack={back}
            onNext={next}
            status={params.status}
            onStatusChange={params.onStatusChange}
          />
        ),
      }),
    },
  },
  {
    return: ({
      learn,
      level,
      hours,
      technology,
      motivation,
      format,
      environment,
      reminders,
    }) => ({
      learn,
      level,
      hours,
      technology,
      motivation,
      format,
      environment,
      reminders,
    }),
  },
];
