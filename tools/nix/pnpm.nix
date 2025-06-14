{ pkgs, nodejs, ... }: let
  pnpm = pkgs.pnpm.override {
    version = "10.12.1";
    hash = "sha256-iJusRw7JPMw3ZEiKGda6j5xkitXlCppuS+N2il3jh6M=";
    nodejs = nodejs;
  };
in pnpm
