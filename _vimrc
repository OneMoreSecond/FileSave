set nocompatible

syntax on
color darkblue

if has("win32")
    set guifont=Consolas:h14
    autocmd GUIEnter * simalt ~x
else
    set guifont=ubuntumono\ 20
    autocmd GUIEnter * winsize 200 200
endif

set tabstop=4
set shiftwidth=4
set softtabstop=4

set nobackup
set noswapfile
set autoread
set foldmethod=manual

filetype indent on
set autoindent
set smartindent
set smarttab
set expandtab

set ruler
set number
set autochdir
set hlsearch
set incsearch
set helplang=cn
set backspace=2
set guioptions=
set fileencodings=ucs-bom,utf-16le,utf-8,gb18030,default

function Extend()
    exec "%s/	/    /g"
    exec "nohl"
endfunction

