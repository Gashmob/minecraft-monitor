{}:

let
  pinNixpkgs = import (fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/ebd3748a6b97de45844aa62701b81df35c5c1269.tar.gz";
    sha256 = "15nbraa9jwd9b7w5nbi6kszcq31kc36rxyb2fmzh9z23wn7mniic";
  }) { config = {}; overlays = []; };
in pinNixpkgs
