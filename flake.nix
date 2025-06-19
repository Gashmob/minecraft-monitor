{
  description = "Minecraft Monitor dev environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/4956400a2222603ab2cd614fc5d64204c595de57";
  };

  outputs = { nixpkgs, ... }: let
    currentDir = builtins.toString ./.;
    system = "x86_64-linux";
    pkgs = import nixpkgs { inherit system; };
    pnpm = import ./tools/nix/pnpm.nix { pkgs = pkgs; nodejs = pkgs.nodejs_20; };
  in {
    devShells.${system}.default = pkgs.mkShellNoCC {
      packages = [ 
        pkgs.python313Packages.mkdocs
        pkgs.python313Packages.mkdocs-material
        pkgs.python313Packages.mkdocs-awesome-nav
        pkgs.python313Packages.mkdocs-git-revision-date-localized-plugin

        pnpm
        pkgs.nodemon
      ];

      shellHook = ''
        export ROOT_DIR="${currentDir}"
        export PATH="$PATH:${currentDir}/tools/bin"
        echo -e "\n\033[34mWelcome to \033[1mMinecraft monitor\033[0m\033[34m dev environment\033[0m\n"
      '';
    };
  };
}
