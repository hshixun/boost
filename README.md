# C++ boost build
boost build script

the script will download the latest C++ boost and dependencies(icu)

  - http://www.boost.org/doc/libs/1_62_0/more/getting_started/unix-variants.html
  - http://www.linuxfromscratch.org/blfs/view/svn/general/icu.html

### install
node.js environment is required

```sh
npm install
```

### build

```sh
node index.js
```

insufficient memory(only 1GB) may fail to compile

```
failed gcc.compile.c++ bin.v2/libs/log/build/gcc-4.8.5/release/link-static/threading-multi/setup/init_from_settings.o
```

### TODO

  - openssl dependency download
  - more options control
