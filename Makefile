
SOURCES = game.ts \
		  mainscene.ts \
		  scene.ts \

OBJECTS = $(patsubst %.ts, %.js, $(SOURCES))

all:
	tsc $(SOURCES)

clean:
	rm -f $(OBJECTS)
