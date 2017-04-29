
SOURCES = \
	game.ts \
	input.ts \
	kernel.ts \
	testscene.ts \
	scene.ts \
	update.ts \

OBJECTS = $(patsubst %.ts, %.js, $(SOURCES))

all:
	tsc $(SOURCES)

clean:
	rm -f $(OBJECTS)
