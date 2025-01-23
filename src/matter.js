const initMatter = () => {
    // Module aliases
    const Engine = Matter.Engine,
          Render = Matter.Render,
          World = Matter.World,
          Bodies = Matter.Bodies,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint;

    // Create an engine
    const engine = Engine.create();

    // Create a renderer
    const render = Render.create({
        element: document.getElementById('matter-container'),
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            wireframes: false,
            background: 'transparent',
            pixelRatio: window.devicePixelRatio
        }
    });

    // Load the image texture
    const texture = new Image();
    texture.src = './Public/Images/me.png';

    // Create ground
    const ground = Bodies.rectangle(
        window.innerWidth / 2, 
        window.innerHeight + 60, 
        window.innerWidth, 
        120, 
        { 
            isStatic: true, 
            render: { fillStyle: 'transparent' } 
        }
    );

    // Create shapes with image texture
    const shapes = [];
    const createShape = () => {
        const size = Math.random() * 30 + 15; // Reduced size between 15 and 45
        return Bodies.circle(
            Math.random() * window.innerWidth, 
            Math.random() * -500, 
            size, 
            {
                restitution: 0.5,
                render: {
                    sprite: {
                        texture: texture.src,
                        xScale: size / 200,
                        yScale: size / 200,
                        opacity: 0.7
                    }
                }
            }
        );
    };

    // Wait for texture to load before creating shapes
    texture.onload = () => {
        // Create initial shapes
        for (let i = 0; i < 75; i++) {
            const shape = createShape();
            shapes.push(shape);
        }
        World.add(engine.world, shapes);
    };

    // Add ground to the world
    World.add(engine.world, [ground]);

    // Create mouse constraint for interaction
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

    // Add mouse constraint to the world
    World.add(engine.world, mouseConstraint);

    // Keep the mouse in sync with rendering
    render.mouse = mouse;

    // Run the engine
    Matter.Runner.run(engine);
    Render.run(render);

    // Handle window resize
    window.addEventListener('resize', () => {
        render.canvas.width = window.innerWidth;
        render.canvas.height = window.innerHeight;
        Matter.Body.setPosition(ground, { 
            x: window.innerWidth / 2, 
            y: window.innerHeight + 60 
        });
    });

    // Add new shapes periodically
    setInterval(() => {
        if (shapes.length < 75) {
            const shape = createShape();
            shapes.push(shape);
            World.add(engine.world, [shape]);
        }
    }, 200);

    // Remove shapes that fall too far
    setInterval(() => {
        shapes.forEach((shape, index) => {
            if (shape.position.y > window.innerHeight + 100) {
                World.remove(engine.world, shape);
                shapes.splice(index, 1);
            }
        });
    }, 5000);
};

// Initialize when the window loads
window.addEventListener('load', initMatter);