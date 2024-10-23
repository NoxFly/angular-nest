srcDir="../front/dist/browser"
outDir="./dist/public"

([ -d "$outDir" ] || mkdir -p "$outDir") && ([ -d "$srcDir" ] && cp -u -v -r $srcDir/* "$outDir")