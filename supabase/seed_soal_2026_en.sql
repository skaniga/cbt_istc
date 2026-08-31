-- ================================================================
-- SOAL BAHASA INGGRIS (EN) — UPDATE KOLOM pertanyaan_en, pilihan_*_en
-- ================================================================

ALTER TABLE public.questions
  ADD COLUMN IF NOT EXISTS pertanyaan_en TEXT,
  ADD COLUMN IF NOT EXISTS pilihan_a_en  TEXT,
  ADD COLUMN IF NOT EXISTS pilihan_b_en  TEXT,
  ADD COLUMN IF NOT EXISTS pilihan_c_en  TEXT,
  ADD COLUMN IF NOT EXISTS pilihan_d_en  TEXT;

-- ================================================================
-- SECTION I: ENVIRONMENTAL TECHNOLOGY (Questions 1-50)
-- ================================================================

UPDATE public.questions SET pertanyaan_en='The following action that is an example of applying the Reduce principle is...', pilihan_a_en='Processing plastic bottles into flower pots', pilihan_b_en='Bringing your own drinking bottle from home', pilihan_c_en='Selling used paper to a recycling center', pilihan_d_en='Reusing used cardboard for book containers' WHERE nomor_soal=1;

UPDATE public.questions SET pertanyaan_en='The greenhouse gas most abundantly produced from the combustion of vehicle fossil fuels is...', pilihan_a_en='Oxygen', pilihan_b_en='Carbon dioxide', pilihan_c_en='Nitrogen', pilihan_d_en='Water vapor' WHERE nomor_soal=2;

UPDATE public.questions SET pertanyaan_en='A solar energy capture device that directly converts sunlight into electricity is...', pilihan_a_en='Windmill', pilihan_b_en='Solar panel (Solar cell)', pilihan_c_en='Diesel generator', pilihan_d_en='Water turbine' WHERE nomor_soal=3;

UPDATE public.questions SET pertanyaan_en='Processing leaf litter and food waste into organic fertilizer is called...', pilihan_a_en='Composting', pilihan_b_en='Recycling', pilihan_c_en='Incineration', pilihan_d_en='Reforestation' WHERE nomor_soal=4;

UPDATE public.questions SET pertanyaan_en='The main advantage of using biogas fuel from livestock manure compared to fossil fuels is...', pilihan_a_en='It is very expensive', pilihan_b_en='It is renewable and environmentally friendly', pilihan_c_en='It has dangerous gas pressure', pilihan_d_en='It produces thick black smoke' WHERE nomor_soal=5;

UPDATE public.questions SET pertanyaan_en='The process of filtering seawater into drinkable fresh water is called...', pilihan_a_en='Aeration', pilihan_b_en='Desalination', pilihan_c_en='Eutrophication', pilihan_d_en='Sublimation' WHERE nomor_soal=6;

UPDATE public.questions SET pertanyaan_en='Biodegradable plastic is a more environmentally friendly type of plastic because...', pilihan_a_en='It is resistant to high-temperature fire', pilihan_b_en='It is easily decomposed by soil microorganisms', pilihan_c_en='It cannot change shape', pilihan_d_en='It is made from pure petroleum' WHERE nomor_soal=7;

UPDATE public.questions SET pertanyaan_en='Replanting trees in barren forests to absorb CO2 is called...', pilihan_a_en='Intercropping', pilihan_b_en='Reforestation', pilihan_c_en='Irrigation', pilihan_d_en='Sanitation' WHERE nomor_soal=8;

UPDATE public.questions SET pertanyaan_en='An example of a renewable energy source that utilizes heat from within the earth is...', pilihan_a_en='Geothermal', pilihan_b_en='Biomass', pilihan_c_en='Nuclear', pilihan_d_en='Wave' WHERE nomor_soal=9;

UPDATE public.questions SET pertanyaan_en='A vertical farming system in urban areas that saves land is called...', pilihan_a_en='Permaculture', pilihan_b_en='Vertical Farming / Verticulture', pilihan_c_en='Extensification', pilihan_d_en='Monoculture' WHERE nomor_soal=10;

UPDATE public.questions SET pertanyaan_en='One of the characteristics of an environmentally friendly building (Green Building) is...', pilihan_a_en='Using full AC all day without windows', pilihan_b_en='Having plenty of natural ventilation and lighting', pilihan_c_en='Entire walls made of thick closed glass', pilihan_d_en='Using high-power incandescent bulbs' WHERE nomor_soal=11;

UPDATE public.questions SET pertanyaan_en='The term for leftover waste from electronic goods such as used cellphones and computers is...', pilihan_a_en='Organic waste', pilihan_b_en='E-waste (Electronic waste)', pilihan_c_en='Medical waste', pilihan_d_en='Toxic gas' WHERE nomor_soal=12;

UPDATE public.questions SET pertanyaan_en='Growing plants without soil media, instead using nutrient-rich water, is called...', pilihan_a_en='Aquaponics', pilihan_b_en='Hydroponics', pilihan_c_en='Air layering', pilihan_d_en='Cutting' WHERE nomor_soal=13;

UPDATE public.questions SET pertanyaan_en='The negative impact of using single-use plastic bags on the ocean is...', pilihan_a_en='Seawater becomes saltier', pilihan_b_en='Marine animals like turtles can die from eating plastic waste', pilihan_c_en='Ocean waves become larger', pilihan_d_en='Coral reefs grow too fast' WHERE nomor_soal=14;

UPDATE public.questions SET pertanyaan_en='An irrigation technology that delivers water slowly directly to plant roots to save water is...', pilihan_a_en='Sprinkler', pilihan_b_en='Drip irrigation', pilihan_c_en='Flood', pilihan_d_en='Open channel' WHERE nomor_soal=15;

UPDATE public.questions SET pertanyaan_en='The combination of fish farming and hydroponic plants in one system is called...', pilihan_a_en='Aeroponics', pilihan_b_en='Aquaponics', pilihan_c_en='Mariculture', pilihan_d_en='Monoculture' WHERE nomor_soal=16;

UPDATE public.questions SET pertanyaan_en='A device that uses the blowing wind to spin an electrical generator is called...', pilihan_a_en='Anemometer', pilihan_b_en='Wind turbine', pilihan_c_en='Barometer', pilihan_d_en='Compressor' WHERE nomor_soal=17;

UPDATE public.questions SET pertanyaan_en='Reusing used glass syrup bottles for cold drinking water containers in the refrigerator is an application of the principle of...', pilihan_a_en='Reduce', pilihan_b_en='Reuse', pilihan_c_en='Recycle', pilihan_d_en='Replace' WHERE nomor_soal=18;

UPDATE public.questions SET pertanyaan_en='Methane gas produced from landfills comes from a decomposition process that is...', pilihan_a_en='Aerobic (needs air)', pilihan_b_en='Anaerobic (without air)', pilihan_c_en='Combustion', pilihan_d_en='Freezing' WHERE nomor_soal=19;

UPDATE public.questions SET pertanyaan_en='The most effective use of energy-saving lamps today is the type of lamp...', pilihan_a_en='Incandescent', pilihan_b_en='LED', pilihan_c_en='Regular neon tube', pilihan_d_en='Halogen' WHERE nomor_soal=20;

UPDATE public.questions SET pertanyaan_en='The phenomenon of pollutants entering water environments and reducing water quality is called...', pilihan_a_en='Acid rain', pilihan_b_en='Water pollution', pilihan_c_en='Acidification', pilihan_d_en='Greenhouse effect' WHERE nomor_soal=21;

UPDATE public.questions SET pertanyaan_en='The ability of certain plants to absorb and clean toxic substances from the soil is called...', pilihan_a_en='Bioremediation', pilihan_b_en='Phytoremediation', pilihan_c_en='Oxidation', pilihan_d_en='Fermentation' WHERE nomor_soal=22;

UPDATE public.questions SET pertanyaan_en='The main advantage of Electric Vehicles (EVs) over gasoline vehicles is...', pilihan_a_en='They do not produce direct exhaust emissions', pilihan_b_en='They do not use batteries', pilihan_c_en='They are heavier and slower', pilihan_d_en='They require more engine oil' WHERE nomor_soal=23;

UPDATE public.questions SET pertanyaan_en='The easiest way to save electricity at home is...', pilihan_a_en='Leaving the TV on while sleeping', pilihan_b_en='Turning off lights and electronic devices when not in use', pilihan_c_en='Leaning the refrigerator near the stove', pilihan_d_en='Using the AC at the coldest setting of 16 degrees C with the door open' WHERE nomor_soal=24;

UPDATE public.questions SET pertanyaan_en='The use of leftover rice-washing water to water plants aims to...', pilihan_a_en='Kill plants', pilihan_b_en='Save clean water and provide nutrients to the soil', pilihan_c_en='Make the soil hard', pilihan_d_en='Quickly repel insects' WHERE nomor_soal=25;

UPDATE public.questions SET pertanyaan_en='The main raw material for making bioethanol often used is plants that contain...', pilihan_a_en='Sugar or starch (such as cassava and sugarcane)', pilihan_b_en='Coconut oil', pilihan_c_en='Hardwood', pilihan_d_en='Coal' WHERE nomor_soal=26;

UPDATE public.questions SET pertanyaan_en='One of the main causes of flooding in urban areas is...', pilihan_a_en='The large number of city parks', pilihan_b_en='The reduction of water catchment areas due to concrete paving', pilihan_c_en='Planting air-cleaning trees', pilihan_d_en='The use of infiltration wells' WHERE nomor_soal=27;

UPDATE public.questions SET pertanyaan_en='The function of rainwater harvesting is...', pilihan_a_en='To multiply mosquitoes', pilihan_b_en='To collect rainwater for watering plants and washing vehicles', pilihan_c_en='To make rainwater the main source of electricity', pilihan_d_en='To dry up residents'' wells' WHERE nomor_soal=28;

UPDATE public.questions SET pertanyaan_en='Ozone layer depletion in the earth''s atmosphere is primarily caused by the chemical substance...', pilihan_a_en='Carbon monoxide', pilihan_b_en='CFCs (Chlorofluorocarbons) from old cooling devices', pilihan_c_en='Oxygen', pilihan_d_en='Nitrogen dioxide' WHERE nomor_soal=29;

UPDATE public.questions SET pertanyaan_en='Processing plastic waste into handcrafted goods is called...', pilihan_a_en='Incineration', pilihan_b_en='Upcycling / Creative recycling', pilihan_c_en='Reforestation', pilihan_d_en='Distillation' WHERE nomor_soal=30;

UPDATE public.questions SET pertanyaan_en='The term Carbon Footprint describes...', pilihan_a_en='Footprints on carbon-rich soil', pilihan_b_en='The total amount of greenhouse gas emissions produced by our activities', pilihan_c_en='The total forest area in a country', pilihan_d_en='The weight of coal mined' WHERE nomor_soal=31;

UPDATE public.questions SET pertanyaan_en='An air filter installed in factories to reduce fine dust emissions is...', pilihan_a_en='Water filter', pilihan_b_en='Smoke filter / Scrubber', pilihan_c_en='Air compressor', pilihan_d_en='Wind sensor' WHERE nomor_soal=32;

UPDATE public.questions SET pertanyaan_en='Microplastics are dangerous to the marine ecosystem because...', pilihan_a_en='They add nutrients for fish', pilihan_b_en='They are eaten by marine animals and enter the food chain', pilihan_c_en='They accelerate coral reef growth', pilihan_d_en='They turn the water clear' WHERE nomor_soal=33;

UPDATE public.questions SET pertanyaan_en='Ocean wave energy utilizes...', pilihan_a_en='Water surface heat', pilihan_b_en='The up-and-down movement of the sea surface caused by wind', pilihan_c_en='The salt content of seawater', pilihan_d_en='The depth of seawater' WHERE nomor_soal=34;

UPDATE public.questions SET pertanyaan_en='Mangrove forests on the coast serve to...', pilihan_a_en='Accelerate coastal abrasion', pilihan_b_en='Prevent coastal erosion and act as a breeding ground for marine biota', pilihan_c_en='Absorb seawater to make the tide recede', pilihan_d_en='Produce main firewood' WHERE nomor_soal=35;

UPDATE public.questions SET pertanyaan_en='A device that converts household organic waste into cooking gas is called...', pilihan_a_en='Incinerator', pilihan_b_en='Biodigester', pilihan_c_en='Compressor', pilihan_d_en='Radiator' WHERE nomor_soal=36;

UPDATE public.questions SET pertanyaan_en='Biodiesel fuel is made from...', pilihan_a_en='Petroleum', pilihan_b_en='Vegetable oil (such as palm oil)', pilihan_c_en='Liquefied natural gas', pilihan_d_en='Liquid coal' WHERE nomor_soal=37;

UPDATE public.questions SET pertanyaan_en='The effort to reduce the use of styrofoam food containers and replace them with reusable food boxes is an act of...', pilihan_a_en='Recycle', pilihan_b_en='Replace', pilihan_c_en='Refuse', pilihan_d_en='Rot' WHERE nomor_soal=38;

UPDATE public.questions SET pertanyaan_en='Hydro power energy sources utilize...', pilihan_a_en='Water odor', pilihan_b_en='Potential and kinetic energy from waterfalls/dams', pilihan_c_en='Water clarity', pilihan_d_en='Cold water temperatures' WHERE nomor_soal=39;

UPDATE public.questions SET pertanyaan_en='The concept of a smart city integrated with environmentally friendly technology is called...', pilihan_a_en='Industrial City', pilihan_b_en='Smart & Green City', pilihan_c_en='Megacity', pilihan_d_en='Metropolis' WHERE nomor_soal=40;

UPDATE public.questions SET pertanyaan_en='A toxic, colorless, and odorless gas from incomplete vehicle combustion exhaust is...', pilihan_a_en='CO2', pilihan_b_en='CO (Carbon Monoxide)', pilihan_c_en='O3', pilihan_d_en='N2' WHERE nomor_soal=41;

UPDATE public.questions SET pertanyaan_en='The use of environmentally friendly detergents aims to...', pilihan_a_en='Make abundant foam fill the river', pilihan_b_en='Be easily degraded and not damage river ecosystems', pilihan_c_en='Make clothes rot quickly', pilihan_d_en='Make the water turn cloudy' WHERE nomor_soal=42;

UPDATE public.questions SET pertanyaan_en='Liquid compost made from organic waste extracts is called...', pilihan_a_en='Urea chemical fertilizer', pilihan_b_en='Liquid Organic Fertilizer (POC)', pilihan_c_en='Synthetic pesticide', pilihan_d_en='NPK' WHERE nomor_soal=43;

UPDATE public.questions SET pertanyaan_en='The benefit of making biopore holes in the yard is...', pilihan_a_en='A place to throw plastic', pilihan_b_en='Increasing rainwater absorption into the soil and processing organic waste', pilihan_c_en='A place to install electric poles', pilihan_d_en='Drying the surrounding soil' WHERE nomor_soal=44;

UPDATE public.questions SET pertanyaan_en='Wind Power Plants (PLTB) utilize the resource of...', pilihan_a_en='Water', pilihan_b_en='Wind', pilihan_c_en='Sun', pilihan_d_en='Geothermal' WHERE nomor_soal=45;

UPDATE public.questions SET pertanyaan_en='Acid rain occurs when industrial smoke reacts with water vapor to form substances...', pilihan_a_en='Sulfuric acid and nitric acid', pilihan_b_en='Table salt', pilihan_c_en='Alcohol', pilihan_d_en='Ammonia' WHERE nomor_soal=46;

UPDATE public.questions SET pertanyaan_en='Processing used paper into newspapers or cardboard again is the process of...', pilihan_a_en='Reuse', pilihan_b_en='Recycle', pilihan_c_en='Reduce', pilihan_d_en='Repair' WHERE nomor_soal=47;

UPDATE public.questions SET pertanyaan_en='The main composition of household waste is mostly in the form of...', pilihan_a_en='Thick plastic', pilihan_b_en='Organic waste/food scraps', pilihan_c_en='Glass and metal', pilihan_d_en='Used batteries' WHERE nomor_soal=48;

UPDATE public.questions SET pertanyaan_en='The main function of a Green Roof on modern buildings is...', pilihan_a_en='Adding weight to the building load', pilihan_b_en='Absorbing heat, reducing the greenhouse effect, and storing rainwater', pilihan_c_en='A place to park vehicles', pilihan_d_en='Storing used goods' WHERE nomor_soal=49;

UPDATE public.questions SET pertanyaan_en='A global energy-saving movement by turning off lights for 1 hour is known as...', pilihan_a_en='Earth Hour', pilihan_b_en='Earth Day', pilihan_c_en='Green Day', pilihan_d_en='Clean Up Day' WHERE nomor_soal=50;

-- ================================================================
-- SECTION II: SMART ROBOTICS (Questions 51-100)
-- ================================================================

UPDATE public.questions SET pertanyaan_en='The part of a robot that functions to receive information from the surrounding environment is called...', pilihan_a_en='Actuator', pilihan_b_en='Sensor', pilihan_c_en='Microcontroller', pilihan_d_en='Battery' WHERE nomor_soal=51;

UPDATE public.questions SET pertanyaan_en='A sensor used by robots to measure the distance to obstacles using sound wave reflections is...', pilihan_a_en='LDR Sensor', pilihan_b_en='Ultrasonic Sensor', pilihan_c_en='Temperature Sensor', pilihan_d_en='Touch Sensor' WHERE nomor_soal=52;

UPDATE public.questions SET pertanyaan_en='The robot component tasked with converting electrical energy into wheel movement is...', pilihan_a_en='Sensor', pilihan_b_en='DC Motor / Actuator', pilihan_c_en='Resistor', pilihan_d_en='LED' WHERE nomor_soal=53;

UPDATE public.questions SET pertanyaan_en='A small circuit board that acts as the brain processing commands in a robot is called...', pilihan_a_en='Transistor', pilihan_b_en='Microcontroller (e.g., Arduino)', pilihan_c_en='Breadboard', pilihan_d_en='Capacitor' WHERE nomor_soal=54;

UPDATE public.questions SET pertanyaan_en='The LDR (Light Dependent Resistor) sensor changes its electrical resistance value based on...', pilihan_a_en='Air temperature', pilihan_b_en='Light intensity', pilihan_c_en='Loud sound', pilihan_d_en='Ground vibration' WHERE nomor_soal=55;

UPDATE public.questions SET pertanyaan_en='A type of motor that can rotate at a very precise angle (e.g., 90 degrees) is...', pilihan_a_en='Regular DC Motor', pilihan_b_en='Servo Motor', pilihan_c_en='Toy dynamo', pilihan_d_en='AC Generator' WHERE nomor_soal=56;

UPDATE public.questions SET pertanyaan_en='A Line Follower Robot can follow lines on the floor because it detects color differences using a sensor...', pilihan_a_en='Infrared / Light', pilihan_b_en='Sound', pilihan_c_en='Humidity', pilihan_d_en='Gas' WHERE nomor_soal=57;

UPDATE public.questions SET pertanyaan_en='The electrical energy storage component that serves as the main power source for the robot is...', pilihan_a_en='Resistor', pilihan_b_en='Battery', pilihan_c_en='Switch', pilihan_d_en='Diode' WHERE nomor_soal=58;

UPDATE public.questions SET pertanyaan_en='The PIR (Passive Infrared) sensor on smart robots is usually used to detect...', pilihan_a_en='Object color', pilihan_b_en='The movement of humans or living creatures', pilihan_c_en='Noise level', pilihan_d_en='Wall distance' WHERE nomor_soal=59;

UPDATE public.questions SET pertanyaan_en='The buzzer component on a robot functions to...', pilihan_a_en='Display images', pilihan_b_en='Emit a warning sound or tone', pilihan_c_en='Move the robot''s legs', pilihan_d_en='Absorb heat' WHERE nomor_soal=60;

UPDATE public.questions SET pertanyaan_en='A hole-filled board used to wire electronic components without needing to solder is called...', pilihan_a_en='PCB', pilihan_b_en='Breadboard / Protoboard', pilihan_c_en='Motherboard', pilihan_d_en='Hard disk' WHERE nomor_soal=61;

UPDATE public.questions SET pertanyaan_en='A small light commonly used as a status indicator on robots is called...', pilihan_a_en='LDR', pilihan_b_en='LED', pilihan_c_en='LCD', pilihan_d_en='Relay' WHERE nomor_soal=62;

UPDATE public.questions SET pertanyaan_en='The DHT11 sensor in robotics projects is used to measure...', pilihan_a_en='Distance and Speed', pilihan_b_en='Air temperature and Humidity', pilihan_c_en='Light and Color', pilihan_d_en='Water pressure' WHERE nomor_soal=63;

UPDATE public.questions SET pertanyaan_en='An electronic component that limits electrical current so the LED does not burn out is...', pilihan_a_en='Capacitor', pilihan_b_en='Resistor', pilihan_c_en='Transistor', pilihan_d_en='Inductor' WHERE nomor_soal=64;

UPDATE public.questions SET pertanyaan_en='A robot that moves using wheels is called a...', pilihan_a_en='Legged Robot', pilihan_b_en='Wheeled Robot', pilihan_c_en='Drone', pilihan_d_en='Humanoid' WHERE nomor_soal=65;

UPDATE public.questions SET pertanyaan_en='A motor driver is installed between the microcontroller and the motor with the purpose of...', pilihan_a_en='Beautifying the robot', pilihan_b_en='Flowing the large current needed by the motor without damaging the microcontroller', pilihan_c_en='Counting the number of steps', pilihan_d_en='Charging the battery' WHERE nomor_soal=66;

UPDATE public.questions SET pertanyaan_en='A small screen attached to the robot to display readable text is called...', pilihan_a_en='LED', pilihan_b_en='LCD Display', pilihan_c_en='LDR', pilihan_d_en='Solenoid' WHERE nomor_soal=67;

UPDATE public.questions SET pertanyaan_en='A PWM (Pulse Width Modulation) signal on Arduino is often used to set...', pilihan_a_en='Light color', pilihan_b_en='DC motor rotation speed', pilihan_c_en='Memory capacity', pilihan_d_en='Sound frequency' WHERE nomor_soal=68;

UPDATE public.questions SET pertanyaan_en='A mechanical touch sensor in the form of a small switch that is pressed when hitting a wall is called...', pilihan_a_en='Limit switch / Bump sensor', pilihan_b_en='Gyroscope', pilihan_c_en='Barometer', pilihan_d_en='Potentiometer' WHERE nomor_soal=69;

UPDATE public.questions SET pertanyaan_en='A robot shaped to resemble human anatomy (having a head, 2 arms, 2 legs) is called...', pilihan_a_en='Manipulator', pilihan_b_en='Humanoid', pilihan_c_en='Quadruped', pilihan_d_en='ROV' WHERE nomor_soal=70;

UPDATE public.questions SET pertanyaan_en='The opposite of a sensor that receives input, a component that produces a physical output is called...', pilihan_a_en='Transducer', pilihan_b_en='Actuator', pilihan_c_en='Processor', pilihan_d_en='Input device' WHERE nomor_soal=71;

UPDATE public.questions SET pertanyaan_en='A Bluetooth wireless module is installed on the robot so the robot can...', pilihan_a_en='Fly', pilihan_b_en='Be remotely controlled via Smartphone', pilihan_c_en='Walk without a battery', pilihan_d_en='Auto-charge' WHERE nomor_soal=72;

UPDATE public.questions SET pertanyaan_en='The application/software where we type program code to upload to the Arduino is called...', pilihan_a_en='Microsoft Word', pilihan_b_en='Arduino IDE', pilihan_c_en='Corel Draw', pilihan_d_en='Photoshop' WHERE nomor_soal=73;

UPDATE public.questions SET pertanyaan_en='An electronic switch component that is moved electromagnetically to control high-voltage currents is...', pilihan_a_en='Diode', pilihan_b_en='Relay', pilihan_c_en='Capacitor', pilihan_d_en='Transistor' WHERE nomor_soal=74;

UPDATE public.questions SET pertanyaan_en='A sensor that can measure the tilt and balance of a robot is...', pilihan_a_en='Gas Sensor', pilihan_b_en='Gyroscope / MPU6050', pilihan_c_en='Rain Sensor', pilihan_d_en='Fire Sensor' WHERE nomor_soal=75;

UPDATE public.questions SET pertanyaan_en='The term Autonomous Robot means the robot...', pilihan_a_en='Must always be plugged into a power cable', pilihan_b_en='Is capable of working and making decisions itself automatically', pilihan_c_en='Is controlled by a full manual remote control', pilihan_d_en='Has no electronic systems' WHERE nomor_soal=76;

UPDATE public.questions SET pertanyaan_en='Small needle-tipped cables used to connect components on a breadboard are called...', pilihan_a_en='USB cables', pilihan_b_en='Jumper wires (Male/Female)', pilihan_c_en='PLN power cables', pilihan_d_en='Coaxial cables' WHERE nomor_soal=77;

UPDATE public.questions SET pertanyaan_en='The VCC pin on electronic sensor modules is generally connected to the pole...', pilihan_a_en='Negative / Ground (GND)', pilihan_b_en='Positive (Power +5V or +3.3V)', pilihan_c_en='Digital signal', pilihan_d_en='Antenna' WHERE nomor_soal=78;

UPDATE public.questions SET pertanyaan_en='The GND pin on a robot circuit board means...', pilihan_a_en='General Node', pilihan_b_en='Ground / Negative Pole (0V)', pilihan_c_en='Green Diode', pilihan_d_en='Power Input' WHERE nomor_soal=79;

UPDATE public.questions SET pertanyaan_en='A sensor that detects the presence of sparks for firefighting robots is called...', pilihan_a_en='Flame Sensor', pilihan_b_en='Rain Sensor', pilihan_c_en='Soil Sensor', pilihan_d_en='Sound Sensor' WHERE nomor_soal=80;

UPDATE public.questions SET pertanyaan_en='A soil moisture sensor is very useful if applied to a robotic project of...', pilihan_a_en='A glass-cleaning robot', pilihan_b_en='An automatic plant-watering robot', pilihan_c_en='A food-delivery robot', pilihan_d_en='A soccer robot' WHERE nomor_soal=81;

UPDATE public.questions SET pertanyaan_en='The programming language that forms the basis of coding on Arduino is based on the language...', pilihan_a_en='Python', pilihan_b_en='C / C++', pilihan_c_en='HTML', pilihan_d_en='Scratch' WHERE nomor_soal=82;

UPDATE public.questions SET pertanyaan_en='In an Arduino program, the loop() function block is useful for...', pilihan_a_en='Executing commands only once when turned on', pilihan_b_en='Executing commands repeatedly and continuously', pilihan_c_en='Stopping the program', pilihan_d_en='Deleting program code' WHERE nomor_soal=83;

UPDATE public.questions SET pertanyaan_en='To delay the robot''s movement for 1 second in an Arduino program, the command written is...', pilihan_a_en='wait(1);', pilihan_b_en='delay(1000);', pilihan_c_en='stop(100);', pilihan_d_en='pause(10);' WHERE nomor_soal=84;

UPDATE public.questions SET pertanyaan_en='A versatile wheel at the back of a two-wheeled robot that can rotate freely in any direction is called...', pilihan_a_en='Castor wheel', pilihan_b_en='Offroad wheel', pilihan_c_en='Track wheel', pilihan_d_en='Inner tube' WHERE nomor_soal=85;

UPDATE public.questions SET pertanyaan_en='A variable voltage divider component turned by hand to adjust volume/speed is...', pilihan_a_en='Fixed resistor', pilihan_b_en='Potentiometer', pilihan_c_en='Zener Diode', pilihan_d_en='Transformer' WHERE nomor_soal=86;

UPDATE public.questions SET pertanyaan_en='A smart camera used by robots to recognize the shape of human faces utilizes the technology of...', pilihan_a_en='Sound Detection', pilihan_b_en='Computer Vision', pilihan_c_en='Thermal Sensor', pilihan_d_en='Proximity' WHERE nomor_soal=87;

UPDATE public.questions SET pertanyaan_en='A sensor that works by emitting infrared rays and receiving their reflections to detect nearby objects is called...', pilihan_a_en='Proximity IR Sensor', pilihan_b_en='Barometer Sensor', pilihan_c_en='pH Sensor', pilihan_d_en='Carbon Sensor' WHERE nomor_soal=88;

UPDATE public.questions SET pertanyaan_en='A type of stepper motor is often used in 3D printers or precision robotic arms because...', pilihan_a_en='It is very cheap', pilihan_b_en='Its movements can be controlled per step very accurately', pilihan_c_en='It requires no electricity', pilihan_d_en='It has the highest speed in the world' WHERE nomor_soal=89;

UPDATE public.questions SET pertanyaan_en='Robotic arms widely installed in car assembly plants are called...', pilihan_a_en='Bipedal Robots', pilihan_b_en='Arm Robots / Manipulators', pilihan_c_en='Drones', pilihan_d_en='Hovercrafts' WHERE nomor_soal=90;

UPDATE public.questions SET pertanyaan_en='The use of GPS on autonomous lawnmower robots is useful for...', pilihan_a_en='Cutting grass', pilihan_b_en='Determining location coordinates and outdoor navigation', pilihan_c_en='Measuring grass height', pilihan_d_en='Charging batteries' WHERE nomor_soal=91;

UPDATE public.questions SET pertanyaan_en='An electrical current rectifier component that only allows current to flow in one direction is...', pilihan_a_en='Resistor', pilihan_b_en='Diode', pilihan_c_en='Capacitor', pilihan_d_en='Inductor' WHERE nomor_soal=92;

UPDATE public.questions SET pertanyaan_en='Short-range radio-wave based wireless data communication present on cellphones and microcontrollers is...', pilihan_a_en='Wi-Fi and Bluetooth', pilihan_b_en='LAN cable', pilihan_c_en='Fiber Optic', pilihan_d_en='Satellite' WHERE nomor_soal=93;

UPDATE public.questions SET pertanyaan_en='To read a signal from a push button on Arduino, we use the command...', pilihan_a_en='digitalWrite()', pilihan_b_en='digitalRead()', pilihan_c_en='analogWrite()', pilihan_d_en='serialPrint()' WHERE nomor_soal=94;

UPDATE public.questions SET pertanyaan_en='A water sensor that detects the presence of raindrops is...', pilihan_a_en='Rain Sensor', pilihan_b_en='Gas Sensor MQ-2', pilihan_c_en='Touch Sensor', pilihan_d_en='Color Sensor' WHERE nomor_soal=95;

UPDATE public.questions SET pertanyaan_en='The logic command structure used to make choice decisions on a robot is...', pilihan_a_en='for', pilihan_b_en='if - else', pilihan_c_en='while', pilihan_d_en='void' WHERE nomor_soal=96;

UPDATE public.questions SET pertanyaan_en='Unmanned submarine robots are called...', pilihan_a_en='UAV', pilihan_b_en='ROV / AUV (Submersible)', pilihan_c_en='Drone', pilihan_d_en='AGV' WHERE nomor_soal=97;

UPDATE public.questions SET pertanyaan_en='An electronic component that functions to temporarily store an electrical charge is...', pilihan_a_en='Resistor', pilihan_b_en='Capacitor', pilihan_c_en='Transistor', pilihan_d_en='Switch' WHERE nomor_soal=98;

UPDATE public.questions SET pertanyaan_en='The function of a color sensor on an item-sorting robot is...', pilihan_a_en='Measuring item weight', pilihan_b_en='Detecting RGB colors from an object', pilihan_c_en='Counting the number of items', pilihan_d_en='Moving items' WHERE nomor_soal=99;

UPDATE public.questions SET pertanyaan_en='The abbreviation for the technology that connects robotic devices to internet networks is...', pilihan_a_en='Input of Things', pilihan_b_en='Internet of Things', pilihan_c_en='Integration of Technology', pilihan_d_en='Internal of Telecom' WHERE nomor_soal=100;

-- ================================================================
-- SECTION III: SCIENCE IN ACTION (Questions 101-150)
-- ================================================================

UPDATE public.questions SET pertanyaan_en='In a scientific experiment, the factor intentionally changed by the researcher is called the variable...', pilihan_a_en='Dependent', pilihan_b_en='Independent', pilihan_c_en='Control', pilihan_d_en='Confounding' WHERE nomor_soal=101;

UPDATE public.questions SET pertanyaan_en='A length measuring tool that has an accuracy of up to 0.1 mm and can measure the inner diameter of a bottle is...', pilihan_a_en='Ruler', pilihan_b_en='Vernier caliper', pilihan_c_en='Micrometer screw gauge', pilihan_d_en='Tape measure' WHERE nomor_soal=102;

UPDATE public.questions SET pertanyaan_en='When an acidic solution is mixed with blue litmus paper, the color of the litmus paper will change to...', pilihan_a_en='Red', pilihan_b_en='Green', pilihan_c_en='Yellow', pilihan_d_en='Stay blue' WHERE nomor_soal=103;

UPDATE public.questions SET pertanyaan_en='The phenomenon of an object''s property of inertia (the ability to maintain a state of rest/motion) is explained in...', pilihan_a_en='Newton''s First Law', pilihan_b_en='Newton''s Second Law', pilihan_c_en='Newton''s Third Law', pilihan_d_en='Pascal''s Law' WHERE nomor_soal=104;

UPDATE public.questions SET pertanyaan_en='The change in state of matter directly from solid to gas without melting is called...', pilihan_a_en='Evaporating', pilihan_b_en='Sublimation', pilihan_c_en='Condensing', pilihan_d_en='Freezing' WHERE nomor_soal=105;

UPDATE public.questions SET pertanyaan_en='A scaled glass tube laboratory instrument used to measure the volume of a liquid is...', pilihan_a_en='Test tube', pilihan_b_en='Measuring cylinder', pilihan_c_en='Erlenmeyer flask', pilihan_d_en='Dropper pipette' WHERE nomor_soal=106;

UPDATE public.questions SET pertanyaan_en='The properties of the image formed by a plane mirror are...', pilihan_a_en='Virtual, upright, same size', pilihan_b_en='Real, inverted, magnified', pilihan_c_en='Virtual, inverted, diminished', pilihan_d_en='Real, upright, diminished' WHERE nomor_soal=107;

UPDATE public.questions SET pertanyaan_en='A metal spoon inserted into a cup of hot tea also feels hot. This heat transfer event occurs via...', pilihan_a_en='Convection', pilihan_b_en='Conduction', pilihan_c_en='Radiation', pilihan_d_en='Evaporation' WHERE nomor_soal=108;

UPDATE public.questions SET pertanyaan_en='In a sugar-water mixture, the substance acting as the solvent is...', pilihan_a_en='Sugar', pilihan_b_en='Water', pilihan_c_en='Sugar and water mixture', pilihan_d_en='Glass container' WHERE nomor_soal=109;

UPDATE public.questions SET pertanyaan_en='Plant cell organelles that contain chlorophyll for photosynthesis are...', pilihan_a_en='Mitochondria', pilihan_b_en='Chloroplast', pilihan_c_en='Ribosome', pilihan_d_en='Cell nucleus' WHERE nomor_soal=110;

UPDATE public.questions SET pertanyaan_en='The movement of water molecules through a semipermeable membrane from a dilute to a concentrated solution is called...', pilihan_a_en='Diffusion', pilihan_b_en='Osmosis', pilihan_c_en='Transpiration', pilihan_d_en='Capillarity' WHERE nomor_soal=111;

UPDATE public.questions SET pertanyaan_en='Archimedes'' principle states that an object immersed in a liquid will experience an upward force equal to...', pilihan_a_en='The object''s weight in the air', pilihan_b_en='The weight of the liquid displaced by the object', pilihan_c_en='The total volume of the object', pilihan_d_en='The object''s density' WHERE nomor_soal=112;

UPDATE public.questions SET pertanyaan_en='The pH value for a neutral solution (such as pure water) is...', pilihan_a_en='0', pilihan_b_en='7', pilihan_c_en='14', pilihan_d_en='1' WHERE nomor_soal=113;

UPDATE public.questions SET pertanyaan_en='The method of separating a sand and water mixture simply by filtering using filter paper is called...', pilihan_a_en='Distillation', pilihan_b_en='Filtration', pilihan_c_en='Crystallization', pilihan_d_en='Chromatography' WHERE nomor_soal=114;

UPDATE public.questions SET pertanyaan_en='Kinetic energy is possessed by objects that are...', pilihan_a_en='Stationary at a height', pilihan_b_en='Moving with a velocity', pilihan_c_en='Pressed', pilihan_d_en='Heated' WHERE nomor_soal=115;

UPDATE public.questions SET pertanyaan_en='The International System (SI) unit for measuring temperature is...', pilihan_a_en='Celsius', pilihan_b_en='Kelvin', pilihan_c_en='Fahrenheit', pilihan_d_en='Reaumur' WHERE nomor_soal=116;

UPDATE public.questions SET pertanyaan_en='The part of the eye that functions to regulate the amount of light entering the eye is...', pilihan_a_en='Cornea', pilihan_b_en='Pupil / Iris', pilihan_c_en='Lens', pilihan_d_en='Retina' WHERE nomor_soal=117;

UPDATE public.questions SET pertanyaan_en='The bending/closing movement of a sensitive plant''s leaves when touched is called movement...', pilihan_a_en='Phototropism', pilihan_b_en='Seismonasty / Thigmonasty', pilihan_c_en='Hydrotropism', pilihan_d_en='Geotropism' WHERE nomor_soal=118;

UPDATE public.questions SET pertanyaan_en='The group of animals that nurse their young belongs to the class...', pilihan_a_en='Reptiles', pilihan_b_en='Mammals', pilihan_c_en='Aves (Birds)', pilihan_d_en='Amphibians' WHERE nomor_soal=119;

UPDATE public.questions SET pertanyaan_en='Sound can propagate fastest through a medium of...', pilihan_a_en='Empty space / vacuum', pilihan_b_en='Solid objects (such as iron)', pilihan_c_en='Clear water', pilihan_d_en='Oxygen gas' WHERE nomor_soal=120;

UPDATE public.questions SET pertanyaan_en='A simple machine of a first-class lever has the position of the fulcrum located...', pilihan_a_en='Between the load and effort', pilihan_b_en='At the far right end', pilihan_c_en='Above the load', pilihan_d_en='Free anywhere' WHERE nomor_soal=121;

UPDATE public.questions SET pertanyaan_en='The gas needed by plants in the process of photosynthesis is...', pilihan_a_en='Oxygen', pilihan_b_en='Carbon dioxide (CO2)', pilihan_c_en='Nitrogen', pilihan_d_en='Helium' WHERE nomor_soal=122;

UPDATE public.questions SET pertanyaan_en='Blood vessels that carry blood back to the heart are vessels...', pilihan_a_en='Artery', pilihan_b_en='Vein', pilihan_c_en='Capillary', pilihan_d_en='Aorta' WHERE nomor_soal=123;

UPDATE public.questions SET pertanyaan_en='A reaction between an acid and a base that produces salt and water is called a reaction...', pilihan_a_en='Oxidation', pilihan_b_en='Neutralization', pilihan_c_en='Combustion', pilihan_d_en='Fermentation' WHERE nomor_soal=124;

UPDATE public.questions SET pertanyaan_en='The mirror used on curved roads to see vehicles from the opposite direction is a mirror...', pilihan_a_en='Plane', pilihan_b_en='Convex', pilihan_c_en='Concave', pilihan_d_en='Concave-convex' WHERE nomor_soal=125;

UPDATE public.questions SET pertanyaan_en='The amylase (ptyalin) enzyme in the mouth functions to convert...', pilihan_a_en='Proteins into amino acids', pilihan_b_en='Starch (carbohydrates) into simple sugars', pilihan_c_en='Fats into fatty acids', pilihan_d_en='Vitamins into minerals' WHERE nomor_soal=126;

UPDATE public.questions SET pertanyaan_en='A fire hazard symbol on a laboratory chemical bottle indicates the material is easily...', pilihan_a_en='Explosive', pilihan_b_en='Flammable', pilihan_c_en='Toxic', pilihan_d_en='Volatile' WHERE nomor_soal=127;

UPDATE public.questions SET pertanyaan_en='Artificial vegetative propagation by peeling the stem bark and wrapping it with humus soil is called...', pilihan_a_en='Cutting', pilihan_b_en='Air layering (Marcotting)', pilihan_c_en='Layering', pilihan_d_en='Grafting' WHERE nomor_soal=128;

UPDATE public.questions SET pertanyaan_en='A pair of substances classified as chemical elements is...', pilihan_a_en='Water and Salt', pilihan_b_en='Oxygen (O2) and Iron (Fe)', pilihan_c_en='Air and Vinegar', pilihan_d_en='Sugar and Syrup' WHERE nomor_soal=129;

UPDATE public.questions SET pertanyaan_en='The International System (SI) unit for measuring Force is...', pilihan_a_en='Joule', pilihan_b_en='Newton', pilihan_c_en='Watt', pilihan_d_en='Pascal' WHERE nomor_soal=130;

UPDATE public.questions SET pertanyaan_en='A rigid body will be in a state of equilibrium if the sum of the forces acting on it equals...', pilihan_a_en='Maximum', pilihan_b_en='Zero', pilihan_c_en='Infinity', pilihan_d_en='Negative' WHERE nomor_soal=131;

UPDATE public.questions SET pertanyaan_en='The red color in human blood is caused by an oxygen-binding protein called...', pilihan_a_en='Leukocytes', pilihan_b_en='Hemoglobin', pilihan_c_en='Platelets', pilihan_d_en='Plasma' WHERE nomor_soal=132;

UPDATE public.questions SET pertanyaan_en='The separation of liquid mixtures based on differences in boiling points is called...', pilihan_a_en='Filtration', pilihan_b_en='Distillation', pilihan_c_en='Sublimation', pilihan_d_en='Evaporation' WHERE nomor_soal=133;

UPDATE public.questions SET pertanyaan_en='Ohm''s Law formulates the relationship between voltage (V), current (I), and resistance (R) as...', pilihan_a_en='V = I x R', pilihan_b_en='V = I / R', pilihan_c_en='I = V x R', pilihan_d_en='R = V x I' WHERE nomor_soal=134;

UPDATE public.questions SET pertanyaan_en='The phenomenon of white light separating into rainbow colors when passing through a glass prism is called...', pilihan_a_en='Reflection', pilihan_b_en='Light dispersion', pilihan_c_en='Refraction', pilihan_d_en='Absorption' WHERE nomor_soal=135;

UPDATE public.questions SET pertanyaan_en='The lens used in glasses for people suffering from nearsightedness (Myopia) is a lens...', pilihan_a_en='Convex (Positive)', pilihan_b_en='Concave (Negative)', pilihan_c_en='Double', pilihan_d_en='Flat' WHERE nomor_soal=136;

UPDATE public.questions SET pertanyaan_en='Air pressure is measured using a device called...', pilihan_a_en='Thermometer', pilihan_b_en='Barometer', pilihan_c_en='Hygrometer', pilihan_d_en='Anemometer' WHERE nomor_soal=137;

UPDATE public.questions SET pertanyaan_en='Lactobacillus bulgaricus bacteria is beneficial to humans in the making of...', pilihan_a_en='Tempeh', pilihan_b_en='Yogurt', pilihan_c_en='Bread', pilihan_d_en='Soy sauce' WHERE nomor_soal=138;

UPDATE public.questions SET pertanyaan_en='The energy transformation that occurs in an electric iron being used is...', pilihan_a_en='Chemical energy to heat', pilihan_b_en='Electrical energy to heat energy', pilihan_c_en='Motion energy to electricity', pilihan_d_en='Light energy to heat' WHERE nomor_soal=139;

UPDATE public.questions SET pertanyaan_en='A magnet made by winding a wire carrying an electric current around an iron nail is called...', pilihan_a_en='Permanent magnet', pilihan_b_en='Electromagnet', pilihan_c_en='Induction', pilihan_d_en='Friction' WHERE nomor_soal=140;

UPDATE public.questions SET pertanyaan_en='The process of sperm cell formation in male reproductive organs occurs in...', pilihan_a_en='Ovary', pilihan_b_en='Testis', pilihan_c_en='Kidney', pilihan_d_en='Intestine' WHERE nomor_soal=141;

UPDATE public.questions SET pertanyaan_en='The main organ of the human respiratory system where oxygen and CO2 gas exchange occurs is...', pilihan_a_en='Stomach', pilihan_b_en='Alveolus (inside the lungs)', pilihan_c_en='Throat', pilihan_d_en='Heart' WHERE nomor_soal=142;

UPDATE public.questions SET pertanyaan_en='The properties of the image formed by a microscope on final observation are...', pilihan_a_en='Virtual, inverted, magnified', pilihan_b_en='Real, upright, diminished', pilihan_c_en='Virtual, upright, same size', pilihan_d_en='Real, inverted, diminished' WHERE nomor_soal=143;

UPDATE public.questions SET pertanyaan_en='A pure substance that cannot be broken down into simpler substances is called...', pilihan_a_en='Mixture', pilihan_b_en='Element', pilihan_c_en='Compound', pilihan_d_en='Solution' WHERE nomor_soal=144;

UPDATE public.questions SET pertanyaan_en='An example of harmful friction in everyday life is...', pilihan_a_en='Friction of bicycle brakes with wheel rims', pilihan_b_en='Friction between car tires and the highway', pilihan_c_en='Friction of car engine components causing wear and tear', pilihan_d_en='Friction of shoes with the floor to prevent slipping' WHERE nomor_soal=145;

UPDATE public.questions SET pertanyaan_en='An example of heat transfer by radiation is...', pilihan_a_en='Water boiling when cooked', pilihan_b_en='The warmth of sunlight reaching the earth', pilihan_c_en='A cup feeling warm when filled with hot water', pilihan_d_en='The occurrence of land breezes and sea breezes' WHERE nomor_soal=146;

UPDATE public.questions SET pertanyaan_en='Work (W) in physics is defined as the product of force (F) and...', pilihan_a_en='Mass (m)', pilihan_b_en='Displacement (s)', pilihan_c_en='Time (t)', pilihan_d_en='Velocity (v)' WHERE nomor_soal=147;

UPDATE public.questions SET pertanyaan_en='The unit of electrical resistance in SI is...', pilihan_a_en='Volt', pilihan_b_en='Ampere', pilihan_c_en='Ohm', pilihan_d_en='Watt' WHERE nomor_soal=148;

UPDATE public.questions SET pertanyaan_en='The correct sequence of levels of organization of life from smallest to largest is...', pilihan_a_en='Cell -> Tissue -> Organ -> Organ System -> Organism', pilihan_b_en='Organ -> Cell -> Tissue -> Organism', pilihan_c_en='Tissue -> Cell -> Organ -> Organ System', pilihan_d_en='Organism -> Cell -> Tissue -> Organ' WHERE nomor_soal=149;

UPDATE public.questions SET pertanyaan_en='An initial assumption statement that must be tested for truth through experiments is called...', pilihan_a_en='Conclusion', pilihan_b_en='Hypothesis', pilihan_c_en='Theory', pilihan_d_en='Data' WHERE nomor_soal=150;

-- ================================================================
-- SECTION IV: MATHEMATIC (Questions 151-200)
-- ================================================================

UPDATE public.questions SET pertanyaan_en='The result of (-15) + 8 x (-3) is...', pilihan_a_en='21', pilihan_b_en='-39', pilihan_c_en='-69', pilihan_d_en='39' WHERE nomor_soal=151;

UPDATE public.questions SET pertanyaan_en='If 3x + 7 = 22, then the value of x is...', pilihan_a_en='3', pilihan_b_en='5', pilihan_c_en='7', pilihan_d_en='15' WHERE nomor_soal=152;

UPDATE public.questions SET pertanyaan_en='The simplified form of 5a - 3b + 2a + 8b is...', pilihan_a_en='7a + 5b', pilihan_b_en='3a + 11b', pilihan_c_en='10ab', pilihan_d_en='7a - 5b' WHERE nomor_soal=153;

UPDATE public.questions SET pertanyaan_en='A shirt priced at 150,000 gets a 20% discount. The price to be paid is...', pilihan_a_en='120,000', pilihan_b_en='130,000', pilihan_c_en='135,000', pilihan_d_en='140,000' WHERE nomor_soal=154;

UPDATE public.questions SET pertanyaan_en='The value of the square root of 169 is...', pilihan_a_en='19', pilihan_b_en='21', pilihan_c_en='13', pilihan_d_en='25' WHERE nomor_soal=155;

UPDATE public.questions SET pertanyaan_en='A square has a side length of 12 cm. The area of the square is...', pilihan_a_en='48 cm2', pilihan_b_en='144 cm2', pilihan_c_en='120 cm2', pilihan_d_en='240 cm2' WHERE nomor_soal=156;

UPDATE public.questions SET pertanyaan_en='The Greatest Common Factor (GCF) of 24 and 36 is...', pilihan_a_en='6', pilihan_b_en='12', pilihan_c_en='18', pilihan_d_en='72' WHERE nomor_soal=157;

UPDATE public.questions SET pertanyaan_en='The Least Common Multiple (LCM) of 6 and 8 is...', pilihan_a_en='12', pilihan_b_en='24', pilihan_c_en='48', pilihan_d_en='16' WHERE nomor_soal=158;

UPDATE public.questions SET pertanyaan_en='The hypotenuse length of a right-angled triangle with a base of 9 cm and a height of 12 cm is...', pilihan_a_en='13 cm', pilihan_b_en='15 cm', pilihan_c_en='17 cm', pilihan_d_en='20 cm' WHERE nomor_soal=159;

UPDATE public.questions SET pertanyaan_en='The average value of the math scores: 6, 7, 8, 8, 9 is...', pilihan_a_en='7.4', pilihan_b_en='7.6', pilihan_c_en='7.8', pilihan_d_en='8.0' WHERE nomor_soal=160;

UPDATE public.questions SET pertanyaan_en='The result of 3/4 + 1/2 is...', pilihan_a_en='4/6', pilihan_b_en='5/4', pilihan_c_en='1', pilihan_d_en='3/8' WHERE nomor_soal=161;

UPDATE public.questions SET pertanyaan_en='If A = {1, 2, 3, 4} and B = {3, 4, 5, 6}, then A intersect B is...', pilihan_a_en='{1, 2}', pilihan_b_en='{3, 4}', pilihan_c_en='{5, 6}', pilihan_d_en='{1, 2, 3, 4, 5, 6}' WHERE nomor_soal=162;

UPDATE public.questions SET pertanyaan_en='A 6-sided die is rolled once. The probability of getting an odd number is...', pilihan_a_en='1/6', pilihan_b_en='1/3', pilihan_c_en='1/2', pilihan_d_en='2/3' WHERE nomor_soal=163;

UPDATE public.questions SET pertanyaan_en='The circumference of a circle with a radius of 7 cm is (pi = 22/7)...', pilihan_a_en='22 cm', pilihan_b_en='44 cm', pilihan_c_en='154 cm', pilihan_d_en='88 cm' WHERE nomor_soal=164;

UPDATE public.questions SET pertanyaan_en='The area of a circle with a radius of 7 cm is (pi = 22/7)...', pilihan_a_en='44 cm2', pilihan_b_en='154 cm2', pilihan_c_en='308 cm2', pilihan_d_en='616 cm2' WHERE nomor_soal=165;

UPDATE public.questions SET pertanyaan_en='The value of 2 to the power of 4 is...', pilihan_a_en='8', pilihan_b_en='12', pilihan_c_en='16', pilihan_d_en='32' WHERE nomor_soal=166;

UPDATE public.questions SET pertanyaan_en='The expansion result of (x + 4)(x + 2) is...', pilihan_a_en='x^2 + 6x + 8', pilihan_b_en='x^2 + 8x + 6', pilihan_c_en='x^2 + 2x + 8', pilihan_d_en='x^2 + 4x + 2' WHERE nomor_soal=167;

UPDATE public.questions SET pertanyaan_en='A car needs 3 liters of gasoline to travel 45 km. The distance traveled with 5 liters of gasoline is...', pilihan_a_en='60 km', pilihan_b_en='75 km', pilihan_c_en='90 km', pilihan_d_en='100 km' WHERE nomor_soal=168;

UPDATE public.questions SET pertanyaan_en='The volume of a cube with an edge length of 5 cm is...', pilihan_a_en='25 cm3', pilihan_b_en='100 cm3', pilihan_c_en='125 cm3', pilihan_d_en='150 cm3' WHERE nomor_soal=169;

UPDATE public.questions SET pertanyaan_en='If f(x) = 2x + 5, the value of f(3) is...', pilihan_a_en='8', pilihan_b_en='11', pilihan_c_en='13', pilihan_d_en='16' WHERE nomor_soal=170;

UPDATE public.questions SET pertanyaan_en='The solution to 2x - 4 > 6 is...', pilihan_a_en='x > 5', pilihan_b_en='x < 5', pilihan_c_en='x > 1', pilihan_d_en='x < 1' WHERE nomor_soal=171;

UPDATE public.questions SET pertanyaan_en='The gradient of the line from the equation y = 3x - 2 is...', pilihan_a_en='-2', pilihan_b_en='2', pilihan_c_en='3', pilihan_d_en='-3' WHERE nomor_soal=172;

UPDATE public.questions SET pertanyaan_en='The area of a triangle with a base of 10 cm and a height of 6 cm is...', pilihan_a_en='60 cm2', pilihan_b_en='30 cm2', pilihan_c_en='20 cm2', pilihan_d_en='15 cm2' WHERE nomor_soal=173;

UPDATE public.questions SET pertanyaan_en='The median of the ordered data: 3, 5, 7, 8, 9 is...', pilihan_a_en='5', pilihan_b_en='7', pilihan_c_en='8', pilihan_d_en='6' WHERE nomor_soal=174;

UPDATE public.questions SET pertanyaan_en='The mode of the data set: 5, 6, 6, 7, 8, 6, 9 is...', pilihan_a_en='5', pilihan_b_en='6', pilihan_c_en='7', pilihan_d_en='8' WHERE nomor_soal=175;

UPDATE public.questions SET pertanyaan_en='Map scale 1 : 100,000. If the distance on the map is 5 cm, the actual distance is...', pilihan_a_en='5 km', pilihan_b_en='50 km', pilihan_c_en='500 m', pilihan_d_en='50 m' WHERE nomor_soal=176;

UPDATE public.questions SET pertanyaan_en='The sum of the interior angles of a triangle is...', pilihan_a_en='90 degrees', pilihan_b_en='180 degrees', pilihan_c_en='270 degrees', pilihan_d_en='360 degrees' WHERE nomor_soal=177;

UPDATE public.questions SET pertanyaan_en='The result of 4 to the power of 3 is...', pilihan_a_en='12', pilihan_b_en='16', pilihan_c_en='64', pilihan_d_en='256' WHERE nomor_soal=178;

UPDATE public.questions SET pertanyaan_en='A rectangular cuboid has dimensions of length 10 cm, width 4 cm, and height 5 cm. The volume is...', pilihan_a_en='200 cm3', pilihan_b_en='100 cm3', pilihan_c_en='19 cm3', pilihan_d_en='400 cm3' WHERE nomor_soal=179;

UPDATE public.questions SET pertanyaan_en='The 5th term of the arithmetic sequence 2, 5, 8, 11, ... is...', pilihan_a_en='13', pilihan_b_en='14', pilihan_c_en='15', pilihan_d_en='16' WHERE nomor_soal=180;

UPDATE public.questions SET pertanyaan_en='The result of (-4) to the power of 2 is...', pilihan_a_en='-16', pilihan_b_en='-8', pilihan_c_en='16', pilihan_d_en='8' WHERE nomor_soal=181;

UPDATE public.questions SET pertanyaan_en='The ratio of Ani''s and Budi''s ages is 2 : 3. If the sum of their ages is 20 years, Budi''s age is...', pilihan_a_en='8 years', pilihan_b_en='12 years', pilihan_c_en='10 years', pilihan_d_en='15 years' WHERE nomor_soal=182;

UPDATE public.questions SET pertanyaan_en='The area of a parallelogram with a base of 8 cm and a height of 5 cm is...', pilihan_a_en='20 cm2', pilihan_b_en='40 cm2', pilihan_c_en='13 cm2', pilihan_d_en='80 cm2' WHERE nomor_soal=183;

UPDATE public.questions SET pertanyaan_en='The magnitude of a right angle is...', pilihan_a_en='45 degrees', pilihan_b_en='90 degrees', pilihan_c_en='180 degrees', pilihan_d_en='360 degrees' WHERE nomor_soal=184;

UPDATE public.questions SET pertanyaan_en='If x + 5 = 12, then the value of 2x is...', pilihan_a_en='7', pilihan_b_en='14', pilihan_c_en='10', pilihan_d_en='24' WHERE nomor_soal=185;

UPDATE public.questions SET pertanyaan_en='A coin is tossed once. The probability of showing Heads is...', pilihan_a_en='1/4', pilihan_b_en='1/2', pilihan_c_en='1', pilihan_d_en='0' WHERE nomor_soal=186;

UPDATE public.questions SET pertanyaan_en='The perimeter of a square with an area of 81 cm2 is...', pilihan_a_en='9 cm', pilihan_b_en='36 cm', pilihan_c_en='18 cm', pilihan_d_en='81 cm' WHERE nomor_soal=187;

UPDATE public.questions SET pertanyaan_en='The result of 10 to the power of 0 is...', pilihan_a_en='0', pilihan_b_en='1', pilihan_c_en='10', pilihan_d_en='Undefined' WHERE nomor_soal=188;

UPDATE public.questions SET pertanyaan_en='A merchant buys goods for 50,000 and resells them for 60,000. The profit percentage is...', pilihan_a_en='10%', pilihan_b_en='15%', pilihan_c_en='20%', pilihan_d_en='25%' WHERE nomor_soal=189;

UPDATE public.questions SET pertanyaan_en='The number of axes of symmetry in a kite shape is...', pilihan_a_en='1', pilihan_b_en='2', pilihan_c_en='3', pilihan_d_en='4' WHERE nomor_soal=190;

UPDATE public.questions SET pertanyaan_en='The result of 3 x (4 + 6) - 5 is...', pilihan_a_en='20', pilihan_b_en='25', pilihan_c_en='30', pilihan_d_en='15' WHERE nomor_soal=191;

UPDATE public.questions SET pertanyaan_en='The length of the face diagonal of a cube with an edge of 6 cm is...', pilihan_a_en='6 root 2 cm', pilihan_b_en='6 root 3 cm', pilihan_c_en='12 cm', pilihan_d_en='36 cm' WHERE nomor_soal=192;

UPDATE public.questions SET pertanyaan_en='The coordinate point A(3, -5) is located in quadrant...', pilihan_a_en='I', pilihan_b_en='II', pilihan_c_en='III', pilihan_d_en='IV' WHERE nomor_soal=193;

UPDATE public.questions SET pertanyaan_en='The result of 2/5 x 15/4 is...', pilihan_a_en='3/2', pilihan_b_en='8/75', pilihan_c_en='3/4', pilihan_d_en='1' WHERE nomor_soal=194;

UPDATE public.questions SET pertanyaan_en='The form 2^3 x 2^2 if simplified becomes...', pilihan_a_en='2^5', pilihan_b_en='2^6', pilihan_c_en='4^5', pilihan_d_en='4^6' WHERE nomor_soal=195;

UPDATE public.questions SET pertanyaan_en='A cylinder has a radius of 7 cm and a height of 10 cm. The base area of the cylinder is...', pilihan_a_en='154 cm2', pilihan_b_en='440 cm2', pilihan_c_en='70 cm2', pilihan_d_en='308 cm2' WHERE nomor_soal=196;

UPDATE public.questions SET pertanyaan_en='Two parallel lines have gradients that are...', pilihan_a_en='Opposite', pilihan_b_en='Same', pilihan_c_en='Vastly different', pilihan_d_en='Zero' WHERE nomor_soal=197;

UPDATE public.questions SET pertanyaan_en='The magnitude of a straight angle is...', pilihan_a_en='90 degrees', pilihan_b_en='180 degrees', pilihan_c_en='270 degrees', pilihan_d_en='360 degrees' WHERE nomor_soal=198;

UPDATE public.questions SET pertanyaan_en='The value of 5! (5 factorial = 5 x 4 x 3 x 2 x 1) is...', pilihan_a_en='120', pilihan_b_en='60', pilihan_c_en='20', pilihan_d_en='100' WHERE nomor_soal=199;

UPDATE public.questions SET pertanyaan_en='The number of vertices on a 3D cube is...', pilihan_a_en='6', pilihan_b_en='8', pilihan_c_en='12', pilihan_d_en='16' WHERE nomor_soal=200;
