# imageboard (4chan) thread visualiser
A system to view a 4chan thread as a chart using cytoscape

# how do i use it
just take a 4chan url and replace `https://boards.4channel.org/` with `https://claydegruchy.github.io/imageboard-thread-visualiser/dist/index?thread=`. for example:
- thread url is `https://boards.4channel.org/ck/thread/17106389`
- take the `ck/thread/17106389`
- and add it to the front of
- `https://claydegruchy.github.io/imageboard-thread-visualiser/dist/index?thread=`
- which would make:
- https://claydegruchy.github.io/imageboard-thread-visualiser/dist/index?thread=ck/thread/17106389


# but... why
:^)

# hows it work?
its made in `react` using the `cytoscape` package. it also runs the requests though `jsonp.afeld.me` to deal with cors.