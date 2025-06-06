{ pkgs ? (import ./tools/nix/pin-nixpkgs.nix) {} }:

let 
  currentDir = builtins.toString ./.;
in

pkgs.mkShellNoCC {
  name = "minecraft-monitor-dev-env";

  packages = [
    pkgs.python313Packages.mkdocs
    pkgs.python313Packages.mkdocs-material
  ];

  shellHook = ''
    export ROOT_DIR="${currentDir}"
    export PATH="$PATH:${currentDir}/tools/bin"
    echo -e "\n\033[34mWelcome to \033[1mMinecraft monitor\033[0m\033[34m dev environment\033[0m\n"
  '';
}
