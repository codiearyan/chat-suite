"use client";
import React, { EventHandler, useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { STORAGE_KEY } from "@/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ApiKeys } from "@/lib/utils";
export type ApiKeysEnabledStatus = {
  google: boolean;
  claude: boolean;
  openai: boolean;
};

function AddYourOwnKeys() {
  const [apiKey, setApiKey] = useState<ApiKeys>({
    google: null,
    claude: null,
    openai: null,
  });
  const [keyEnabledStatus, setKeyEnabledStatus] =
    useState<ApiKeysEnabledStatus>({
      google: false,
      claude: false,
      openai: false,
    });

  useEffect(() => {
    const apiKeys = localStorage.getItem(STORAGE_KEY);

    if (apiKeys) {
      try {
        const data = JSON.parse(apiKeys);

        setApiKey({
          claude: data.claude ?? null,
          google: data.google ?? null,
          openai: data.openai ?? null,
        });

        setKeyEnabledStatus({
          claude: Boolean(data.claude && data.claude.trim() !== ""),
          google: Boolean(data.google && data.google.trim() !== ""),
          openai: Boolean(data.openai && data.openai.trim() !== ""),
        });
      } catch (error) {
        console.error("Error parsing API keys from localStorage:", error);
      }
    }
  }, []);

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();

    const keysToSave = {
      claude: keyEnabledStatus.claude ? apiKey.claude : null,
      google: keyEnabledStatus.google ? apiKey.google : null,
      openai: keyEnabledStatus.openai ? apiKey.openai : null,
    };

    console.log("Saving API keys:", keysToSave);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keysToSave));

    window.location.reload();
  };

  return (
    <Dialog>
      <form onSubmit={handleConfirm}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 text-muted-foreground hover:text-foreground border border-white/10 rounded-md px-3 py-2 hover:border-white/20 hover:bg-white/5 transition-all duration-200"
          >
            Add your Own API Keys
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Bring your own API KEYs</DialogTitle>
            <DialogDescription>
              Have an API key, add it here to chat
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <label className="inline-flex items-center cursor-pointer gap-4">
                <span className="text-md font-medium text-gray-900 dark:text-gray-300">
                  Open AI
                </span>
                <input
                  type="checkbox"
                  checked={keyEnabledStatus.openai}
                  className="sr-only peer"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setKeyEnabledStatus((prev) => {
                      return {
                        ...prev,
                        openai: e.target.checked,
                      };
                    });
                  }}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              </label>

              <Input
                id="apikey-openai"
                name="name"
                disabled={!keyEnabledStatus.openai}
                defaultValue={apiKey.openai ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setApiKey((prev: ApiKeys) => {
                    return {
                      ...prev,
                      openai: e.target.value,
                    };
                  });
                }}
              />
            </div>
            <div className="grid gap-3">
              <label className="inline-flex items-center cursor-pointer gap-4">
                <span className="text-md font-medium text-gray-900 dark:text-gray-300">
                  Claude
                </span>
                <input
                  type="checkbox"
                  checked={keyEnabledStatus.claude}
                  className="sr-only peer"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setKeyEnabledStatus((prev) => {
                      return {
                        ...prev,
                        claude: e.target.checked,
                      };
                    });
                  }}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              </label>

              <Input
                id="apikey-claude"
                name="name"
                disabled={!keyEnabledStatus.claude}
                defaultValue={apiKey.claude ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setApiKey((prev: ApiKeys) => {
                    return {
                      ...prev,
                      claude: e.target.value,
                    };
                  });
                }}
              />
            </div>
            <div className="grid gap-3">
              <label className="inline-flex items-center cursor-pointer gap-4">
                <span className="text-md font-medium text-gray-900 dark:text-gray-300">
                  Gemini
                </span>
                <input
                  type="checkbox"
                  checked={keyEnabledStatus.google}
                  className="sr-only peer"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setKeyEnabledStatus((prev) => {
                      return {
                        ...prev,
                        google: e.target.checked,
                      };
                    });
                  }}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              </label>

              <Input
                id="apikey-google"
                name="name"
                disabled={!keyEnabledStatus.google}
                defaultValue={apiKey.google ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setApiKey((prev: ApiKeys) => {
                    return {
                      ...prev,
                      google: e.target.value,
                    };
                  });
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" className="text-white">
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default AddYourOwnKeys;
