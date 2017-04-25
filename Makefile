
SOURCES = game.ts \

OBJECTS = $(patsubst %.ts, %.js, $(SOURCES))

all: $(OBJECTS)

%.js: %.ts
	tsc $<

clean:
	rm -f $(OBJECTS)
