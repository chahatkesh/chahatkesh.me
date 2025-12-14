export interface SyllabusUnit {
  unit: number;
  topics: string;
}

export interface Course {
  code: string;
  name: string;
  professor: string;
  credits: number;
  type: "Theory" | "Lab" | "Elective" | "Project";
  syllabus?: SyllabusUnit[];
}

export interface Semester {
  id: string;
  number: number;
  academicYear: string;
  courses: Course[];
}

export const btechCourses: Semester[] = [
  {
    id: "sem-1",
    number: 1,
    academicYear: "2023-24",
    courses: [
      {
        code: "ITFC0101",
        name: "Problem Solving using Python",
        professor: "Dr. Neeraj Kumar",
        credits: 2,
        type: "Theory",
        syllabus: [
        {
          unit: 1,
          topics: "Computational Thinking and Problem-Solving: Identification of Computational Problems -Algorithms, building blocks of algorithms (statements, state, control flow, functions), notation (pseudo code, flow chart, programming language), algorithmic problem solving, simple strategies for developing algorithms (iteration, recursion)."
        },
        {
          unit: 2,
          topics: "Data Types, Expressions, and Statements: Python interpreter and interactive mode, debugging; values and types: int, float, Boolean, string, and list; variables, expressions, statements, tuple assignment, precedence of operators, comments."
        },
        {
          unit: 3,
          topics: "Control Flow Functions, and Strings: Conditions, iteration, fruitful functions, recursion; Strings - string slices, immutability, string functions and methods; Lists as arrays."
        },
        {
          unit: 4,
          topics: "Lists, Tuples, Dictionaries: Lists, tuples, dictionaries, list comprehension."
        },
        {
          unit: 5,
          topics: "Files, Modules, Packages: Files and exception handling, modules, packages."
        }
      ]
      },
      {
        code: "ITFC0131",
        name: "Python Laboratory",
        professor: "Dr. Neeraj Kumar",
        credits: 1,
        type: "Lab",
      },
      {
        code: "MAFC0102",
        name: "Mathematics-II",
        professor: "Dr. Mohammad Zafar",
        credits: 4,
        type: "Theory",
        syllabus: [
        {
          unit: 1,
          topics: "Linear dependence of vectors and rank of matrices, linear transformations and inverse of matrices, reduction to normal form, bilinear form and quadratic form, consistency and solution of linear algebraic system of equations, eigenvalues, eigenvectors and their applications to system of ordinary differential equations, Cayley Hamilton Theorem, orthogonal, unitary, hermitian and similar matrices."
        },
        {
          unit: 2,
          topics: "Differential calculus of functions of several variables, partial differentiation, homogeneous functions and Euler’s theorem, Taylor’s and Maclaurin’s series, Taylor’s theorem for functions of two variables, maxima and minima of functions of several variables, Lagrange’s method of multipliers."
        },
        {
          unit: 3,
          topics: "Double and triple integrals, change of order of integration, change of variables, applications to evaluation of area, surface area and volume."
        },
        {
          unit: 4,
          topics: "Scalar and vector fields; differentiation of vectors, velocity and acceleration, vector differential operators Del, Gradient, Divergence and Curl and their physical interpretations, formulae involving these operators, line, surface and volume integrals, solenoidal and irrotational vectors, Green’s theorem, Gauss divergence theorem, Stoke’s theorem and their applications."
        },
        {
          unit: 5,
          topics: "Formulation and classification of partial differential equations, solution of first order linear equations, standard forms of non-linear equations, Charpit’s method, linear equations with constant coefficients, non-homogeneous linear equations, Monge’s method for nonhomogeneous equations of second order; separation of variables method for solution of heat, wave and Laplace equation."
        }
      ]
      },
      {
        code: "PDFE0102",
        name: "NSS",
        professor: "Dr. Kiran Singh",
        credits: 1,
        type: "Elective",
      },
      {
        code: "PHFC0107",
        name: "Applied Physics",
        professor: "Dr. Shishram Rebari",
        credits: 3,
        type: "Theory",
        syllabus: [
        {
          unit: 1,
          topics: "Quantum Theory: Concept of wave function and Born interpretation, normalization and orthogonality of wave functions; Schrödinger wave equations; operators, expectation values; time independent Schrödinger wave equation; particle in one dimensional infinite potential well."
        },
        {
          unit: 2,
          topics: "Engineering Optics: Lasers and its characteristics, Einstein coefficients, components of laser, Ruby laser, He-Ne laser, semiconductor lasers, Applications of Lasers, Optical fibers: Classification of optical fibers, Acceptance angle and cone, Numerical aperture, propagation mechanism and communication in optical fiber, attenuation, signal losses and dispersion, Applications of optical fiber in industry and communication."
        },
        {
          unit: 3,
          topics: "Crystal Structure and Defects: Crystalline and amorphous solids, Crystal systems, closed packed structures, Crystallographic planes and directions, Miller indices, Crystal defects and dislocations, X-Ray Diffraction (Bragg's law), types of bonding."
        },
        {
          unit: 4,
          topics: "Semiconductor Physics: Distinction between metals, semiconductors & insulators; Intrinsic and extrinsic semiconductors; Drift velocity, mobility and conductivity of intrinsic semiconductors; Fermi level in intrinsic and extrinsic semiconductors; p-n junction diode."
        }
      ]
      },
      {
        code: "PHFC0137",
        name: "Applied Physics Laboratory",
        professor: "Dr. Shishram Rebari",
        credits: 1,
        type: "Lab",
      },
      {
        code: "WPFC0100",
        name: "Manufacturing Processes (Workshop)",
        professor: "Central Workshop Staff",
        credits: 2,
        type: "Lab",
      },
      {
        code: "ICDC0101",
        name: "Basics of Electrical Engineering",
        professor: "Dr. Dilbagh Singh",
        credits: 4,
        type: "Theory",
        syllabus: [
        {
          unit: 1,
          topics: "DC Circuits : Introduction, Active, Passive and Bilateral Elements, Electrical circuit elements (R, L and C), Ideal & Practical Voltage and Current Sources, Ohm’s Law, Kirchhoff’s laws, Mesh and Nodal Analysis, Star-Delta conversion, Superposition Theorem, Thevenin Theorem, Norton Theorem and Maximum Power Transfer Theorem."
        },
        {
          unit: 2,
          topics: "AC Circuits: Introduction, Representation of sinusoidal waveforms, Peak, average and RMS values, Phasor representation, real power, reactive power, apparent power, power factor and form factor. Analysis of single-phase AC circuits consisting of R, L, C, RL, RC, RLC (series and parallel combinations) and resonance. Introduction to 3-phase Networks: Balanced Star-Delta connections, phase and line currents and voltages and their relations. Measurement of power in 3-phase circuits."
        },
        {
          unit: 3,
          topics: "Magnetic Circuits & Transformers : Introduction, Analogy between electrical and magnetic circuits, Magnetic circuits, Mutual inductance, Coupling Coefficient, Analysis of Coupled Coils, Dot Rule. Basics of ideal and practical transformer, equivalent circuit, open circuit and close circuit test on single phase transformer, losses in transformers (hysteresis and eddy current losses), regulation and efficiency."
        },
        {
          unit: 4,
          topics: "Electrical Machines: Introduction, Types of Electrical Machines and their applications. Construction, principle and working of DC motor and DC generator. Introduction to single-phase and three-phase Induction motor."
        },
        {
          unit: 5,
          topics: "Electrical Installations, Testing and Safety : Introduction, different types of wiring, electrical installation, safety, testing and hazard control. Concepts of grounding and earthing."
        }
      ]
      },
      {
        code: "HMFC0102",
        name: "Management Principles and Indian Constitutional Values",
        professor: "Dr. Vikas Kumar",
        credits: 3,
        type: "Theory",
        syllabus: [
        {
          unit: 1,
          topics: "Nature of Management: Understanding theme of management, management types (vertical differences and horizontal differences), management skills, roles of managers, management in digital age with new managerial competencies. Management and different organizational forces, classical perspective of management (scientific management, bureaucratic organizations, administrative principles), humanistic perspective of management (human relations, human resources and behavioural science perspectives), management science perspective. Recent trends in management (systems theory, contingency approach, total quality management). The learning organization. Managing ethics and social responsibility."
        },
        {
          unit: 2,
          topics: "Management and Organizational Environment: External environment: general environment (technological environment, socio-cultural environment, economic, legal-political environment, international environment), task environment (customer, competitors, suppliers, labour markets). Organization-environment relationship (adapting to the environment). Internal Environment: corporate culture. Management in a global environment: key factors in international environment and managing organizations."
        },
        {
          unit: 3,
          topics: "Management Functions: Planning: overview of goals and plans, planning process, planning for turbulent environment, planning for high performance, strategic planning, decision making process, and types of decisions. Organizing: organizing the vertical structures, departmentalization, and horizontal coordination. Leading: understanding leadership, leadership approaches and styles, understanding motivation using important theories, leading teams. Controlling: controlling process, controlling techniques, balanced scorecard approach."
        },
        {
          unit: 4,
          topics: "Indian Constitutional Framework: Citizenship, fundamental rights, directive principles of state policy, fundamental duties, executive, legislature, and judiciary of union and states. Legislative procedures. Panchayats, municipalities and co-operative societies. Relations between centre and states, elections, languages, special provisions for certain classes."
        }
       ]
      },
    ],
  },
  {
    id: "sem-2",
    number: 2,
    academicYear: "2023-24",
    courses: [
      {
        code: "CSFC0101",
        name: "Computer Programming",
        professor: "Dr. Swarnima Singh Gautam",
        credits: 3,
        type: "Theory",
        syllabus: [
        {
          unit: 1,
          topics: "Introduction: Basics components of a digital computer system, Basic operation of digital computers, basic concepts of integer and floating-point number representations, Different paradigms of computer programming language, Compiler, Interpreter, Assembler, Structure of C program, Compilation process."
        },
        {
          unit: 2,
          topics: "Basics of C programming: Character sets, Identifiers, Keywords, Data Types, Constants, Enumeration Constants, variables, statements; Operators and Expressions: Arithmetic operator, Unary operator, Relational and Logical operator, Assignment operator, Bitwise operator, Ternary operator, Comma operator, precedence and associativity; Input/Output statements, Decision making statements: if – else, nested if-else, Switch statement; Looping statements, Pre-processor directives, Pointers, Pointer operators, Pointer arithmetic."
        },
        {
          unit: 3,
          topics: "Arrays and Strings: Introduction to Arrays: Declaration, Initialization, one dimensional array, Example Program: Computing Mean, Median and Mode, Selection sort, linear and binary search; Two dimensional arrays, Array Address Calculations, String operations: length, compare, concatenate, copy; pointers and Strings, Array of pointers and Pointer to an array."
        },
        {
          unit: 4,
          topics: "Functions: Introduction to functions: Function prototype, function definition, function call, Built-in functions (string functions, math functions), Recursion, Binary Search using recursive functions, Parameter passing: Pass by value, Pass by reference, Returning array from a function, Returning pointer from a function, pointer to a function Passing function as a parameter, storage classes and pre-processor directives."
        },
        {
          unit: 5,
          topics: "Structures: Structure, Nested structures, Pointer and Structures, Array of structures, Example Program using structures and pointers, Self-referential structures, Dynamic memory allocation, Singly linked list, typedef"
        },
        {
          unit: 6,
          topics: "File Processing: Files, Types of file processing: Sequential access, Random access, Sequential access file, Example Program: Finding average of numbers stored in sequential access file, Random access file, Command Line arguments."
        }
       ]
      },
      {
        code: "HMFC0101",
        name: "English Communication and Report Writing",
        professor: "Dr. Radhika Sharma",
        credits: 2,
        type: "Theory",
        syllabus: [
        {
          unit: 1,
          topics: "Communication: Meaning, Significance, Process, Verbal, Non-Verbal, Types, Formal, Informal channels, Functions, Barriers to communication, Miscommunication, Effective communication strategies, Ethical & legal communication, Role of communication in society."
        },
        {
          unit: 2,
          topics: "Technology-enabled communication: Tools, Positive and negative impact of technology-enabled communication, Appropriate & effective technology-based communication."
        },
        {
          unit: 3,
          topics: "Business Correspondence & Etiquettes: Elements of business writing, Business letters, Memorandum, Purchase order, Quotation and tenders, Job application letters, Resume writing, Press release, Etiquettes."
        },
        {
          unit: 4,
          topics: "Phonetics: Organs of speech, Mechanism of sound production, Vowel and consonant sounds, Places of articulation, Manner of articulation, Stress, Intonation."
        },
        {
          unit: 5,
          topics: "Basic Applied Grammar and Usage: Transformation of sentences, Words used as different parts of speech, One word substitution, Abbreviations, Technical terms, Foreign expressions, Sentences: kinds of sentences, Phrases. Parts of speech. Synonyms & antonyms, Spotting errors in sentences, Homophones, Homonyms."
        },
        {
          unit: 6,
          topics: "Reading & Writing Skills: Process of reading, Reading purposes, Characteristic of efficient reading, Models, Strategies, Methodologies, Reading comprehension, Improving comprehension skills, Reading activities. Elements of effective writing, Writing styles, Scientific & technical writing."
        },
        {
          unit: 7,
          topics: "Listening & Speaking Skills: Meaning, Process & types of listening, Active & passive listening, Barriers to listening, Effective listening skills, Feedback skills, Role of listening in an organization. Effective speaking and talk."
        },
        {
          unit: 8,
          topics: "Meeting and Telephonic Skills: Conducting a meeting, Notice, Agenda, Minutes of the meeting, Note of dissent, Telephonic communication, Oral presentation and role of audio visual aids."
        },
        {
          unit: 9,
          topics: "Report Writing: Process of research: Defining and narrowing down the problem, Statement of the problem, Literature review, Hypothesis, Research methodology, Collecting data, Interpreting data, Writing report, Kinds and purpose of Report, Objectives of report, Writing a routine business report, Elements of a long formal report: Abstract, Summary, Introduction, Methodology, Findings and analysis, Conclusion and recommendation, Glossary, Appendix, Index, Bibliography."
        }
       ]
      },
      {
        code: "ICPC0102",
        name: "Basic Electronics and Instrumentation Engineering",
        professor: "Dr. Deblina Biswas",
        credits: 4,
        type: "Theory",
        syllabus: [
        {
          unit: 1,
          topics: "Review of semiconductors: Introduction, semiconductor materials, covalent bond, extrinsic and intrinsic materials, energy levels, p-type and n-type semiconductors."
        },
        {
          unit: 2,
          topics: "Analog Electronics: Introduction, semiconductor diodes, ideal versus practical diodes, diode applications: rectifier circuits (half-wave and full-wave rectifiers, rectifiers with capacitor filter), clipper (limiter) and clamper circuits, introduction to BJT, structure and modes of operation, n-p-n and p-n-p transistor in active mode, introduction to op-amp, ideal op-amp, inverting and non-inverting configuration."
        },
        {
          unit: 3,
          topics: "Digital Electronics: Introduction, Boolean algebra and rules of simplification; logic gates, combinational circuits like adder, decoder, encoder, multiplexer and de-multiplexer; brief introduction to sequential circuits like flip-flops, counters and shift registers."
        },
        {
          unit: 4,
          topics: "Measurement: Introduction to measurement and its significance, methods of measurement, functional block diagram of a generalized measurement system, uncertainties and errors, noise in measurement systems using statistical concept; static characteristics, dynamic characteristics, calibration, impedance loading and matching."
        },
        {
          unit: 5,
          topics: "Basics of Instrumentation: Introduction to instrumentation and its functional elements, applications of instrument systems, classification of instruments, selection of instruments, Basic sensing elements: resistive elements, capacitive elements, inductive."
        }
       ]
      },
      {
        code: "IDFC0101",
        name: "Environmental Sciences",
        professor: "Dr. Amit Dhruv Saran",
        credits: 3,
        type: "Theory",
        syllabus: [
        {
          unit: 1,
          topics: "Humans and the Environment: Definition, scope and importance. Multidisciplinary Nature. Environmental Ethics and Emergence of Environmentalism: Anthropocentric and eco-centric perspectives (major thinkers)."
        },
        {
          unit: 2,
          topics: "Natural Resources and Sustainable Development: Water resources: Use and over-utilization of surface and ground water. Floods, droughts, conflicts over water, dams-benefits and problems. Mineral resources: Use and exploitation. Environmental effects of extracting and using mineral resources. Energy resources: Growing energy needs, renewable and non-renewable energy sources, use of alternate energy sources. Sustainable Development: Chemistry approaches towards Environment Sustainability: Green Chemistry and Green Engineering."
        },
        {
          unit: 3,
          topics: "Environmental Issues: Local, Regional and Global: Solid waste: Municipal and hazardous waste and its management. Land use and Land cover change: Land degradation, deforestation, desertification and urbanization. Disasters: Natural and Man-made (Anthropogenic)."
        },
        {
          unit: 4,
          topics: "Conservation of Biodiversity and Ecosystems: Biodiversity and its distribution: Biodiversity as a natural resource, biodiversity in India and world, biodiversity hotspots. Major Ecosystem types in India and their basic characteristics: General and brief introduction to different ecosystems (Forests, Wetlands, Grasslands, Agriculture, Coastal and Marine). Major conservation policies: in-situ and ex-situ conservation approaches."
        },
        {
          unit: 5,
          topics: "Environmental Pollution and Health: Air pollution: Adverse health impacts of air pollutants, National Ambient Air Quality Standards. Water pollution: Water quality parameters and standards, adverse health impacts of water pollution on human and aquatic life. Soil pollution: Impact on human health and ecosystems. Noise pollution: Noise standards and adverse impacts of noise on human health."
        },
        {
          unit: 6,
          topics: "Climate Change: Impacts, Adaptation and Mitigation: Climate change, global warming, acid rain and ozone layer depletion. Mitigation of climate change: Green House Gas (GHG) reduction vs. sink enhancement, concept of carbon intensity, energy intensity and carbon neutrality, carbon capture and storage, National climate action plan and Intended Nationally Determined Contributions (INDCs) and climate justice. Environmental Management: Introduction to Environmental Laws and Regulation: Constitutional provisions- Article 48A, Article 51A (g). Environmental management system: ISO 14001. Environmental Treaties and Legislation: The Water Act 1974, Forest Act 1980, Air Act 1981, Environment Protection Act 1986, Noise Pollution Rules 2000, Waste management rules. Case Studies and Field Work."
        }
       ]
      },
      {
        code: "MAFC0101",
        name: "Mathematics-I",
        professor: "Dr. Gurwinder Kaur",
        credits: 4,
        type: "Theory",
        syllabus: [
          {
            unit: 1,
            topics: "Formation of ordinary differential equations, solution of first order differential equations by separation of variables, homogeneous equations, exact differential equations, equations reducible to exact form by integrating factors, equations of the first order and higher degree. Clairaut's equation."
          },
          {
            unit: 2,
            topics: "Linear differential equations with constant coefficients, Cauchy's homogeneous linear equation Legendre's linear equation, simultaneous linear equations with constant coefficients."
          },
          {
            unit: 3,
            topics: "Fourier series of periodic functions, even and odd functions, half range expansions and Fourier series of different wave forms, complex form of Fourier series and practical harmonic analysis."
          },
          {
            unit: 4,
            topics: "Laplace transforms of various standard functions, properties of Laplace transforms and inverse Laplace transforms, Convolution theorem, Laplace transforms of unit step function, impulse function and periodic functions, application to solution of ordinary differential equations with constant coefficient and simultaneous differential equations."
          },
          {
            unit: 5,
            topics: "Z-transform and difference equations, Elementary properties of Z-transform, Convolution theorem, formation of difference equations using Z-transform."
          },
          {
            unit: 6,
            topics: "Fourier transforms, Fourier integral theorem, Fourier Sine, Cosine integrals and transforms, Fourier transforms of derivatives of a function, convolution theorem, Parseval's identity."
          }
        ]
      },
      {
        code: "MEFC0102",
        name: "Elements of Mechanical Engineering",
        professor: "Dr. Satyendra Singh",
        credits: 3,
        type: "Theory",
        syllabus: [
        {
          unit: 1,
          topics: "Solid Mechanics: System of forces, coplanar concurrent force system, composition and resolution of force, equilibrium of rigid bodies, free body diagram, Lami’s theorem."
        },
        {
          unit: 2,
          topics: "Analysis of framed structure: Reaction in beam with different end conditions, determination of reactions in members of trusses: a) Analytical methods b) Graphical method."
        },
        {
          unit: 3,
          topics: "Centre of gravity and moment of inertia: Concept of C.G and centroid, position of centroid, theorem of parallel and perpendicular axes, moment of inertia of simple geometrical figures."
        },
        {
          unit: 4,
          topics: "Stress and strain: Concept of stress and strain, simple stresses, tensile, compressive, shear, bending and torsion, stress- strain curves, elongation of bars, composite bars, thermal stresses, elastic constants."
        },
        {
          unit: 5,
          topics: "Thermal Science: Introduction and scope of thermodynamics, thermodynamics properties, forms of energy, thermodynamic systems and control volume, steady flow systems, types of work, thermodynamic processes, laws of thermodynamics, Carnot theorem, concept of entropy. Available energy, availability and irreversibility, Gas power cycles, refrigeration cycles, elements of heat transfer-conduction, convection and radiation."
        },
        {
          unit: 6,
          topics: "Fluids: Fluid and their properties: Ideal and real fluids, capillarity, Vapour pressure, compressibility and bulk modulus, Newtonian and non-Newtonian fluids. Fluid Statics: Concept of pressure, Pascal’s law and its engineering applications, action of fluid pressure on a plane (horizontal, vertical and inclined) submerged surface, resultant force and centre of pressure, Buoyancy and flotation, stability of floating and submerged bodies, Metacentric height."
        }
       ]
      },
      {
        code: "PDFE0118",
        name: "Website Development Management Club",
        professor: "Dr. Harimurugan",
        credits: 1,
        type: "Elective",
      },
      {
        code: "CSFC0131",
        name: "Computer Programming Laboratory",
        professor: "Dr. Swarnima Singh Gautam",
        credits: 1,
        type: "Lab",
      },
      {
        code: "HMFC0131",
        name: "English Communication Laboratory",
        professor: "Dr. Radhika Sharma",
        credits: 1,
        type: "Lab",
      },
      {
        code: "IDFC0131",
        name: "Environmental Sciences Laboratory",
        professor: "Dr. Sangeeta Obrai",
        credits: 1,
        type: "Lab",
      },
      {
        code: "MEFC0132",
        name: "Elements of Mechanical Engineering Laboratory",
        professor: "Dr. Satyendra Singh",
        credits: 1,
        type: "Lab",
      },
    ],
  },
  {
    id: "sem-3",
    number: 3,
    academicYear: "2024-25",
    courses: [
      {
        code: "ECDC0213",
        name: "Analog and Digital Electronics",
        professor: "Dr. Mamta Khosla",
        credits: 3,
        type: "Theory",
        syllabus: [
        {
          unit: 1,
          topics: "Transistors: Basics of BJT, Transistor as an amplifier at low frequency, Hybrid model and re model of BJT, Analysis of amplifier using Hybrid model and re model, Field-Effect Transistor: The junction FET construction, operation, characteristics, parameters, JFET as an amplifier, FET as a VVR and MOSFET- construction, operation, characteristics, parameters, introduction to CMOS."
        },
        {
          unit: 2,
          topics: "Power and Multistage Amplifiers: Power Amplifiers, Types, analysis of Class A, B, C, AB; Multistage Amplifiers, Types of multistage couplings, Feedback Amplifier and Oscillators: Feedback concept, Analysis of various configurations of feedback amplifiers, Criterion for oscillation, voltage-controlled oscillators, phase locked loop."
        },
        {
          unit: 3,
          topics: "Introduction to Op-amps and Applications: Block diagram of a typical Op-Amp, Schematic symbol, Characteristics and performance parameters of ideal Op-Amp, Open loop configurations: Differential, Inverting and Non-Inverting, Voltage-series and Voltage-shunt feedback amplifier, Summing, Scaling, and Averaging amplifiers, Differential amplifier, Instrumentation amplifiers, V to I converters, Differentiator and integrator, Sample and hold circuits, Schmitt trigger, Specialized IC: 555 Timer- Monostable and Astable multivibrators."
        },
        {
          unit: 4,
          topics: "Combinational and Sequential Circuits: Review of simplification methods-Boolean Algebra and Karnaugh map, Combinational Circuits- Adders, Subtractors, Multiplexers, Demultiplexers, Encoders, Decoders, Code Converters, Parity Generator & Checker and Magnitude Comparator, Sequential circuits- Flip flops - SR, JK, D and T, Level triggering and edge triggering, Excitation tables - Counters - Asynchronous and Synchronous type Modulo counters, Shift registers, type of registers, circuit diagrams."
        },
        {
          unit: 5,
          topics: "Digital Logic Families and A/D and D/A converters: Introduction to Logic families: TTL and CMOS, Digital-to-Analog Converter- Weighed R and R-2R ladder D/A converters, Analog-to-Digital Converter- Parallel A/D Converter, Counter type A/D converter, Successive approximation. Characteristics of ADC and DAC – resolution, quantization, conversion/settling time."
        }
      ]
      },
      {
        code: "ICDC0201",
        name: "Circuit Theory",
        professor: "Dr. Ravi Verma",
        credits: 4,
        type: "Theory",
        syllabus: [
        {
          unit: 1,
          topics: "Network Analysis Techniques: Reciprocity Theorem, Milliman’s Theorem, Tellegen’s Theorem and Maximum Power Transfer Theorem – Applications of Network Theorems to network analysis both with AC and DC inputs and dependent and independent sources, Magnetic Coupling."
        },
        {
          unit: 2,
          topics: "Applications of Laplace Transform: Introduction, some basic theorems, solutions of Linear Differential Equations for electric network-problems, partial fraction Expansion-Heaviside’s Expansion Theorem, The convolution Integral-evaluation; Application of Laplace Transform to analysis of electrical circuits – Linear time invariant first and second order circuits. Zero input response, Zero state response and complete response. Impulse response of first and second order circuits, time varying circuits."
        },
        {
          unit: 3,
          topics: "Graph Theory and Network Equations: Introduction, graph of a network, trees, co-trees and loops, incidence matrix, Cut-set matrix, Tie-set matrix and loop currents, Analysis of networks using graph theory, duality, and general network transformations."
        },
        {
          unit: 4,
          topics: "Network Functions: Ports and terminal pairs, network functions, Poles and zeros, necessary conditions for driving point functions and transfer functions, Time-domain analysis from pole zero plot."
        },
        {
          unit: 5,
          topics: "Two Port Networks: Introduction, Characterization of linear time invariant two port networks, Z-, Y-, h- and transmission parameters, Interrelationship between these parameters, Interconnection of Two-port networks, Image parameters; Attenuation and phase shift in symmetrical T- and pi- networks."
        },
        {
          unit: 6,
          topics: "Filters and Active Networks: Introduction to Fourier Transform, Classifications of filters, Filter networks, pass band and stop band types, Constant k-low pass and high pass filters, Characteristics impedance and cut off frequency, m-derived filters."
        }
      ]
      },
      {
        code: "ICDC0203",
        name: "Electrical Measurements and Measuring Instruments",
        professor: "Er. Narinder Singh Bhangal",
        credits: 4,
        type: "Theory",
        syllabus: [
        {
          unit: 1,
          topics: "Measurement Systems: Measurement system architecture, Errors in measurements. Standard used in measurement: Electrical standards, time and frequency standards, physical standards. Direct methods, Indirect methods. Classification of Instruments, Mechanical Instruments, Electrical Instruments and Electronic Instruments. Analog and Digital. Modes of Operation."
        },
        {
          unit: 2,
          topics: "Basic Electrical Measurements: DC voltage/current measurements, AC and DC Potentiometers, Electromechanical and analog electronic AC voltmeters, AC current measurements, Galvanometer, Damping of Galvanometer, Permanent Magnet Moving Coil (PMMC) Instruments, Moving Iron (MI) Instruments, Dynamometer instruments, Wattmeter and Energy Meter, Phase measurements, frequency and time measurements."
        },
        {
          unit: 3,
          topics: "AC/DC Bridge Measurements: Wheatstone bridge, Kelvin Bridge, Anderson Constant current loop, resistance ratio bridge, Schering bridge, Parallel C bridge, De Sauty bridge, Wein bridge, Maxwell’s inductance bridge, Maxwell’s inductance-capacitance bridge, Hay bridge, Owen bridge, Anderson bridge, Heaviside Mutual inductance bridge, Measurement of high resistance including loss of charge method and Mega Ohm bridge."
        },
        {
          unit: 4,
          topics: "Magnetic Measurement: Working principle and theory of Ballistic galvanometer, Measurement of flux density, determination of B-H curve, Hysteresis loop, Ewing double bar permeameter, Hopkinson permeameter, separation of iron losses by wattmeter and Bridge methods, Measurement of Leakage Factor with Flux meter."
        },
        {
          unit: 5,
          topics: "Instrument Transformers: Theory and construction of current and potential transformers, transformation ratio and phase angle errors and their minimization, effects of power factor, secondary burden and frequency, Voltage transformers, Coupling capacitor voltage transformers, Electronic voltage transformers, Errors, Reduction of Errors."
        },
        {
          unit: 6,
          topics: "Cathode Ray Oscilloscope: Principle and working of CRO, Block diagram presentation of CRO and a brief description of various elements of CRO – CRT, horizontal Deflecting system, Vertical deflecting system, CRO screen, Observation of waveform on CRO, Lissajous Patterns, Measurement of voltage, frequency and phase angle using CRO, CRO probes, Oscilloscope specifications and performance. Digital Storage Oscilloscope."
        }
      ]
      },
      {
        code: "ICDC0205",
        name: "Transducers and Signal Conditioning",
        professor: "Dr. Karan Jain",
        credits: 3,
        type: "Theory",
        syllabus: [
        {
          unit: 1,
          topics: "Characteristics of instruments and Measurement System: Measurement systems, basic block diagram of instrumentation system, classification of transducers, static and dynamic performance characteristics, compensation, loading effect, criteria for transducer selection, calibration."
        },
        {
          unit: 2,
          topics: "Measurement of displacement, strain, force and pressure: Principles of displacement measurement, primary sensing elements, Resistive potentiometers, variable induction pick up, LVDT, piezoelectric transducer, principle of operation of strain, force and torque measurement, load cell, strain gauge and its types, principle of pressure measurement, manometers, elastic transducers-diaphragm, bellows, capsule, bourdon tube, capacitive transducers, accelerometer, and vibration measurement."
        },
        {
          unit: 3,
          topics: "Temperature Measurement: Non-electrical methods for measurement of temperature-thermometers, bimetallic strip, Resistance Thermometer, RTD (3/4 wire) Thermistors, thermo-electric sensors-thermocouples, Radiation methods-pyrometers."
        },
        {
          unit: 4,
          topics: "Miscellaneous Transducers: Optical transducers: photo-emissive, photo-conductive, and photo-voltaic cells, digital transducers: optical encoder, shaft encoder, hall-effect transducers, magneto-strictive transducer, electrochemical transducer, smart sensors."
        },
        {
          unit: 5,
          topics: "Signal Conditioning: Basic concepts of signal conditioning, AC/DC Bridge applications, operational amplifiers: its application in instrumentation, Instrumentation amplifier, charge amplifier, filters, Interference, grounding, and shielding."
        }
      ]
      },
      {
        code: "MCDC0203",
        name: "Numerical Methods",
        professor: "Dr. Arshpreet Kaur",
        credits: 4,
        type: "Theory",
        syllabus: [
        {
          unit: 1,
          topics: "Roots of algebraic and transcendental equations: Bisection Method, Regula – Falsi method, Newton – Raphson method, Barstow’s method and Graffe’s root squaring method."
        },
        {
          unit: 2,
          topics: "Solution of simultaneous algebraic equations: matrix inversion and Eigen-value problems, triangularisation method, Jacobi’s and Gauss-Seidel iteration method, partition method for matrix inversion, power method for largest eigen-values and Jacobi’s method for finding eigen-values."
        },
        {
          unit: 3,
          topics: "Interpolation and Finite differences: Finite differences, interpolation and numerical differentiation, forward, backward and central differences, Newton’s forward, backward and divided difference interpolation formulas, Lagrange’s interpolation formula, Stirling’s and Bessel’s central difference interpolation formulas, numerical differentiation using Newton’s forward and backward difference formulas and Numerical differentiations using Stirling’s and Bessel’s central difference interpolation formulas."
        },
        {
          unit: 4,
          topics: "Numerical integration: Trapezoidal rule, Simpson’s one-third rule and numerical double integration using Trapezoidal rule and Simpson’s one-third rule."
        },
        {
          unit: 5,
          topics: "Numerical Method for ODE and PDE: Taylor’s series method, Euler’s and modified Euler’s methods, Runge-Kutta fourth order methods for ordinary differential equations, simultaneous first order differential equations and second order differential equations, Boundary value problems, finite difference methods for boundary value problems. Partial differential equations, finite difference methods for elliptic, Parabolic and hyperbolic equations."
        }
      ]
      },
      {
        code: "ECDC0243",
        name: "Analog and Digital Electronics Laboratory",
        professor: "Dr. Deepti Kakkar",
        credits: 1,
        type: "Lab",
      },
      {
        code: "ICDC0231",
        name: "Circuit Theory Laboratory",
        professor: "Dr. Karan Veer",
        credits: 1,
        type: "Lab",
      },
      {
        code: "ICDC0233",
        name: "Electrical Measurements and Measuring Instruments Laboratory",
        professor: "Dr. Karan Jain",
        credits: 1,
        type: "Lab",
      },
      {
        code: "ICDC0235",
        name: "Transducers and Signal Conditioning Laboratory",
        professor: "Dr. Richa Sharma",
        credits: 1,
        type: "Lab",
      },
    ],
  },
  {
    id: "sem-4",
    number: 4,
    academicYear: "2024-25",
    courses: [
      {
        code: "CSDC0201",
        name: "Data Structure and Algorithms",
        professor: "Dr. Kunwar Pal Singh",
        credits: 3,
        type: "Theory",
        syllabus: [
        {
          unit: 1,
          topics: "Introduction to Data Structures and Complexity Analysis: Overview of data structures, algorithms, Asymptotic notation (Big O, Omega, Theta), Time and space complexity analysis, Best, average and worst-case analysis, Time-space trade-off, Abstract Data types."
        },
        {
          unit: 2,
          topics: "Linear Data Structures: Arrays: introduction to single and multidimensional arrays, Representation in memory and address calculation, Implementing basic algorithms on 1D array (Insertion, deletion, modification, traversal). Implementation of stacks and queues, Stack: operations and applications (reversing string, infix to postfix conversion, evaluation of postfix expression), Queue: types and applications (Circular queue, Priority queue, Deque), Linked List: overview, representation, operations on linked list (creation, insertion, deletion, traversal), Polynomial and sparse matrix representation using linked list."
        },
        {
          unit: 3,
          topics: "Non-Linear Data Structures: Trees: Introduction to tree basic terminology, Array and linked representation of binary tree, Binary tree traversal (in-order, pre-order, post-order), Binary Search Tree (BST): Insertion and Deletion in BST, Balanced BST – AVL tree, Red Black tree, B-Tree: Introduction, definition and operations (search, insertion and deletion). Graphs: Terminology and representation of graphs (Adjacency matrix, adjacency list), Graph traversal algorithms (BFS and DFS)."
        },
        {
          unit: 4,
          topics: "Hashing: Hash functions, Collision resolution techniques, Hash Table implementation, heap-based implementations (Min, Max)."
        },
        {
          unit: 5,
          topics: "Other Concepts: Searching and Sorting: Sequential Search, Binary Search, Comparison and Analysis. Internal Sorting: Insertion Sort, Selection Sort, Bubble Sort, Quick Sort, Two Way Merge Sort, Heap Sort, Radix Sort. Practical considerations for Internal Sorting. Strings: Overview of Strings and String Matching Algorithms (Knuth Morris Pratt, Rabin Karp, Boyer Moore)."
        }
      ]
      },
      {
        code: "ICDC0202",
        name: "Electrical Machines",
        professor: "Dr. Dilbagh Singh",
        credits: 4,
        type: "Theory",
        syllabus: [
        {
          unit: 1,
          topics: "Magnetics and Energy Conversion: Magnetic circuit, Analogies between electric and magnetic circuits, Magnetic Hysteresis and Hysteresis loss, Interaction of magnetic fields, Motor action, Generator action, Eddy current and eddy current losses, Multi-polar machines."
        },
        {
          unit: 2,
          topics: "Transformers: Construction of power and distribution transformers, Principle of transformer action, Concept of ideal transformer, EMF equation, Transformer behavior under loading and unloading, Phasor diagrams, Equivalent circuit, Determination of transformer parameters, Regulation and efficiency, Per-unit impedance of transformer windings, Auto transformer, Parallel operation of transformers, Transformer parameters."
        },
        {
          unit: 3,
          topics: "Three Phase Induction Motors: Construction and principle of operation, Slip-torque equation, characteristics, Phase diagram at standstill and no load, Equivalent circuit, Parasitic torques, No-load and blocked-rotor tests, Starting methods of speed control, Applications, Name plate data, Single phase induction motors."
        },
        {
          unit: 4,
          topics: "Special Motors: Reluctance motors, Hysteresis motors, Shaded-pole motors, Stepper Motors, Universal motor and their characteristics, applications."
        },
        {
          unit: 5,
          topics: "DC Machines: Flux distribution and generating voltage in DC machines, Commutation, Dynamic characteristics of DC motor and generator, DC motor, Armature reaction, Dynamic behavior during speed adjustment, Mechanical Power and developed torque, Losses and efficiency, Starting of DC Motor, Series/Shunt/Compound machine, Plugging and Jogging, Standard terminal markings and connections of DC motors."
        },
        {
          unit: 6,
          topics: "Synchronous Machines: Introduction to synchronous machines."
        }
      ]
      },
      {
        code: "ICDC0204",
        name: "Signal Processing",
        professor: "Dr. Om Prakash Verma",
        credits: 3,
        type: "Theory",
        syllabus: [
        {
          unit: 1,
          topics: "Introduction: Fundamentals of signal and systems, Basic Elements of a Digital Signal Processing System, Classification of Continuous and Discrete Systems: Static & Dynamic, Linear & Nonlinear, Time-variant & Time-invariant, Causal & Non-causal, Stable & Unstable, Recursive & Nonrecursive. Deterministic & Random signals, Energy & Power signals, Correlation, Auto Correlation, Cross Correlation, Analog systems, Correlation, Convolution, Energy density, Spectral Density, Properties of Correlation and Spectral density and their interrelations."
        },
        {
          unit: 2,
          topics: "Fourier series and Fourier Transform: CTFS, CTFT, DTFS, DTFT and its properties, magnitude and phase representation, Computation of DTFT using FFT algorithm, Fast Fourier Transform – Decimation-in-frequency, Decimation-in-time, Butterfly structure, Signal Sampling and Quantization."
        },
        {
          unit: 3,
          topics: "Discrete Time Signal Analysis: Z-transform and its properties, inverse Z-transform, difference equation, Block diagram representation of Discrete-Time Systems, Stability analysis, application to discrete systems, Analysis of Linear Time-Invariant Systems in the Z-Domain, Discrete Convolution."
        },
        {
          unit: 4,
          topics: "Design of Digital Filters: FIR & IIR filter realization – Parallel & cascade forms, FIR design: Windowing techniques – Need and choice of windows – Linear phase characteristics, IIR design: Pole-zero placement, Impulse-invariant, matched z-transform and bilinear transformation methods."
        },
        {
          unit: 5,
          topics: "Digital Signal Processors: Introduction – Architecture – Features – Addressing Formats – Functional models."
        }
      ]
      },
      {
        code: "ICDC0206",
        name: "Control System Engineering",
        professor: "Er. Narinder Singh Bhangal",
        credits: 4,
        type: "Theory",
        syllabus: [
        {
          unit: 1,
          topics: "Introduction to Concepts: Plant, Systems, Servo mechanisms, regulating systems, disturbances, Open loop control system, closed loop control systems, linear and non-linear systems, time variant and invariant, continuous and sampled-data control systems, Block diagrams and modelling of systems."
        },
        {
          unit: 2,
          topics: "Modeling: Formulation of equation of linear electrical, mechanical, thermal, pneumatic and hydraulic systems, Electrical mechanical analogies, Use of Laplace transforms, Transfer function, concept of state variable modelling."
        },
        {
          unit: 3,
          topics: "Time Domain Analysis: Typical test input signals, Transient response of the first and second order systems, Time domain specifications, Dominant poles of higher order systems."
        },
        {
          unit: 4,
          topics: "Root Locus Technique: The concept of root locus for open loop and closed loop systems, Rules for drawing root locus, Breakaway points, Intersection with imaginary axis, location of roots with given gain and effect of PID controllers."
        },
        {
          unit: 5,
          topics: "Frequency Domain Analysis: Closed loop frequency response, Bode plots, stability and loop transfer function, Frequency response specifications, Relative stability, Routh-Hurwitz criterion, Nyquist criterion, Gain margin, Phase margin, Polar plot, Compensation: Necessity of compensation, series and shunt compensation, compensators."
        },
        {
          unit: 6,
          topics: "Control Components: Error detectors – Potentiometers and Synchros, dc and ac servo motors, tachogenerators."
        }
      ]
      },
      {
        code: "ICDC0208",
        name: "Industrial Measurement Systems",
        professor: "Dr. Richa Sharma",
        credits: 3,
        type: "Theory",
        syllabus: [
        {
          unit: 1,
          topics: "Introduction: Review of the functional block diagram of a sensor-based measurement system, generalized performance characteristics of sensors-based instrumentation, terminology and classification."
        },
        {
          unit: 2,
          topics: "Temperature Measurement: Introduction, definitions and standards, primary and secondary temperature calibration, Thermometers, study of filled-in systems, thermometer, bimetallic thermometers, electrical methods of temperature measurement, resistance temperature detectors, thermistors, thermocouple radiation pyrometer."
        },
        {
          unit: 3,
          topics: "Pressure Measurement: Introduction, classification of pressure sensor, units of pressure, manometers, elastic type pressure gauges (Bourdon tube, diaphragm, bellows), electrical pressure transducers for pressure measurement (strain gauges, capacitive type pressure transducer), measurement of vacuum."
        },
        {
          unit: 4,
          topics: "Flow Measurement: Introduction, classification, basic principle, mass flow type, positive displacement type, construction details and theory of head flow meters (orifice plate, venture tube, pitot tube, rotameter), inferential flow meter, turbine flow meter, electromagnetic flow meter, vortex meter."
        },
        {
          unit: 5,
          topics: "Other Variable Measurements: Level measurement (float type, differential pressure type, electrical capacitance type, ultrasonic level sensor), humidity measurement, solid level measurement, mass, weight, force, torque, and shaft power measurement, accelerometers, vibration displacement, velocity and acceleration measurement, vibration measurement."
        }
      ]
      },
      {
        code: "PDFE0207",
        name: "Value Education and Professional Ethics",
        professor: "Dr. Amit Dhruv Saran",
        credits: 1,
        type: "Elective",
      },
      {
        code: "ICDC0232",
        name: "Electrical Machines Laboratory",
        professor: "Dr. Anil Yadav",
        credits: 1,
        type: "Lab",
      },
      {
        code: "ICDC0234",
        name: "Signal Processing Laboratory",
        professor: "Dr. Richa Sharma",
        credits: 1,
        type: "Lab",
      },
      {
        code: "ICDC0236",
        name: "Control System Engineering Laboratory",
        professor: "Dr. Afzal Sikander",
        credits: 1,
        type: "Lab",
      },
    ],
  },
  {
    id: "sem-5",
    number: 5,
    academicYear: "2025-26",
    courses: [
      {
        code: "ICDC0301",
        name: "Microprocessors and Embedded Systems",
        professor: "Dr. Sheela Tiwari",
        credits: 3,
        type: "Theory",
        syllabus: [
          {
            unit: 1,
            topics: "Introduction: Introduction to computer architecture and organization, Von Neumann and Harvard architecture, RISC and CISC processors, 8-, 16-, 32- and 64-bit processors."
          },
          {
            unit: 2,
            topics: "Introduction to 8-bit Microprocessor: Intel 8085 microprocessor, pin configuration, architecture, instruction format, types of instructions, instruction set, addressing modes, timing diagrams, programming 8085, stack, interrupts."
          },
          {
            unit: 3,
            topics: "Peripherals and Interfacing for 8085: Memory interfacing, I/O interfacing: memory-mapped and peripheral-mapped I/O, data transfer schemes, overview of 8251, 8253/8254, 8255, 8279"
          },
          {
            unit: 4,
            topics: "Introduction to 16-bit Microprocessor: Architecture of Intel 8086, block diagram, register set, flags, Queuing, concept of segmentation, Pin description, operating modes, addressing modes and interrupts."
          },
          {
            unit: 5,
            topics: "Microcontrollers: Introduction, factors to be considered for selection of a microcontroller, Intel 8051 microcontroller, architecture, pin configuration, addressing modes, classification of instructions, instruction set, programming 8051, Timer/Counter programming; Serial communication and programming; programming of Interrupts and priority of interrupts, Interfacing with LCD, 7-segment display, ADC/DAC."
          },
          {
            unit: 6,
            topics: "Embedded Systems: Introduction, comparison with a general computing system; Classification of embedded systems; Challenges with embedded systems; Application areas and purpose of embedded systems; Characteristics and quality attributes of embedded systems, Elements of a typical embedded system, introduction to hardware-software co-design."
          },
          {
            unit: 7,
            topics: "Open Source Electronics Platform: Introduction, introduction to Arduino, Arduino IDE, Arduino libraries, creating an Arduino program, Arduino applications, introduction to Raspberry Pi."
          }
        ]
      },
      {
        code: "ICDC0303",
        name: "Modern Control System",
        professor: "Dr. Afzal Sikander",
        credits: 4,
        type: "Theory",
        syllabus: [
          {
            unit: 1,
            topics: "State Space Analysis of Continuous System: State variable representation of continuous system, conversion of state variable models to transfer function and vice-versa, solution of state equations and state transition matrix"
          },
          {
            unit: 2,
            topics: "State Feedback Control and Observer Design: Similarity transformation, Controllability and observability (Gilbert's, Kalman, factor cancellation and PBH tests), pole placement design, state feedback control design, full and reduced order state observer design"
          },
          {
            unit: 3,
            topics: "Fundamentals of Nonlinear System: Types of non linarites, phenomena related to non-linear systems. Analysis of nonlinear systems-Linearization method, second order non-linear system on the phase plane, types of phase portraits, singular points, system analysis by phase-plane method, describing function and its application to system analysis."
          },
          {
            unit: 4,
            topics: "Stability: BIBO and asymptotic stability, sign definiteness, quadratic forms, Sylvester's criterion for sign definiteness, Lyapunov's stability theorems for continuous systems (first and second method), Popov's criterion."
          },
          {
            unit: 5,
            topics: "Optimal Control: Introduction, formation of optimal control problem, calculus of variations minimization of functions, constrained optimization. Pontryagin's Minimum Maximum Principle, Linear Quadratic Problem-Hamilton Jacobi equation, Riccati equation and its solution."
          }
        ]
      },
      {
        code: "ICDC0305",
        name: "Analytical and Optical Instrumentation",
        professor: "Dr. Deblina Biswas",
        credits: 3,
        type: "Theory",
        syllabus: [
          {
            unit: 1,
            topics: "Introduction: Elements of analytical Instrument, Performance requirements of analytical instruments such as errors in chemical analysis, Accuracy and precision, SNR. Intelligent analytical Instrumentation system, PC-Based Analytical Instruments, MEMS in Analytical Instruments, Micro-Fluidics in Analytical Instruments."
          },
          {
            unit: 2,
            topics: "Chromatographic Techniques: Gas Chromatography (GC), Gas Chromatography mass-spectroscopy (GC-MS) Liquid Chromatography (LC), High-Performance Liquid Chromatography (HPLC), Liquid Chromatograph-Mass Spectrometer (LC/MS), Ion Chromatography (IC)- principles, components and applications."
          },
          {
            unit: 3,
            topics: "Gas Analysis: Thermal conductivity gas analyzers, Heat of reaction method, Estimation of Oxygen, Hydrogen, Methane, CO2, Carbon monoxide etc. in binary or complex gas mixtures, paramagnetic oxygen analyzer, Electro chemical reaction method, Polarography, Density measurement."
          },
          {
            unit: 4,
            topics: "Chemical Composition Measurements: Measurement of pH: - definition and methods, redox potential, electrical conductivity, conductivity cell and applications, density measurement: solids, liquids, gases."
          },
          {
            unit: 5,
            topics: "Optical Measurements: Principles of optical measurements (refraction, reflection, transmission, scattering), Optical components (lenses, mirrors, gratings, different optical filters, monochromators, photosensitive detectors), Optical alignment techniques, Light sources (LED, LASER), basics of fibre optics."
          },
          {
            unit: 6,
            topics: "Colorimeters and Spectrophotometers: EM spectrum, interaction of radiation with matter, Laws related to absorption of radiation: Beer-Lambert's law, Spectrophotometry: UV, IR, Photoacoustic, NMR, Mass, Atomic absorption, Flame photometers. Colorimeters: single beam filter photometer and double Beam colorimeter."
          }
        ]
      },
      {
        code: "ICDC0307",
        name: "Process Dynamics and Control",
        professor: "Dr. Om Prakash Verma",
        credits: 4,
        type: "Theory",
        syllabus: [
          {
            unit: 1,
            topics: "Modeling for Process Dynamics: Introductory Concepts, types of model, Modeling principles and tools, Degree of Freedom, Dynamics models of representative processes (Lumped and Distributed Parameter processes), 1st and 2nd Order models: Mercury Thermometer, Liquid Level System, Mixing/Blending, Heating, Nonlinear Model, Linearization and Jacobian Matrix, Heat conduction in solid, Fluidized Bed Reactors, Catalytic Reactors, Packed Bed Reactors, Heat Exchangers, Distillation Columns; Interacting and Non-Interacting tank system, CSTR, Manometer; Dynamic Behavior of Process Models"
          },
          {
            unit: 2,
            topics: "Development of Empirical Models: Model Development using Linear or Nonlinear Regression, Fitting First and Second Order Models using Step Tests, Transportation Lag, Padé Approximation"
          },
          {
            unit: 3,
            topics: "Industrial Controller Design and Tuning: Introduction, Basic Control Modes: Series and Parallel (PID), Features of PID Controllers (Electronic circuitry, Digital versions of PID Control, Performance Criterion, Quarter Amplitude Decay (QAD) Ratio, Methods for Tuning: Trial and Error, Process Reaction Curve, Ziegler-Nichols (Z-N), Cohen-Coon (CC)."
          },
          {
            unit: 4,
            topics: "Final Control Elements: Control valves – Introduction, Parts, Types, Operation, Control Action (Air to Open/Air to Close), Mechanism, Types of Plugs, Characteristics (Linear, Equal Percentage, etc.); Transfer function of Pneumatic Control Valve and Variable Capacitance differential Pressure Transducer, Valve Sizing, Principles of Hydraulics/Pneumatics, Spool Valve, Solenoid, E-P converters, stepper motors."
          },
          {
            unit: 5,
            topics: "Process Applications, Safety & Hazard Measures: Advance Control strategy for Process Models, Hazard identification techniques, Risk assessment methodologies, Risk matrices and ranking, Safety management systems (SMS): Overview, Principles, Compliance with safety standards and regulations, Process safety information (PSI) and process safety hazards."
          }
        ]
      },
      {
        code: "ICDE0305",
        name: "Testing and Calibration",
        professor: "Dr. Karan Veer",
        credits: 3,
        type: "Elective",
        syllabus: [
          {
            unit: 1,
            topics: "Electricity Rules: Indian Electricity Rules, Indian Electricity Act, Electricity Supply Act."
          },
          {
            unit: 2,
            topics: "Concerns of Measurement: Measurements in manufacturing, Measurement in the global marketplace, Importance of measurement, study of various errors in instruments, Need for better measurements, Determine and describe the differences between resolution, accuracy, precision, calibration, Type A uncertainty and Type B uncertainty."
          },
          {
            unit: 3,
            topics: "Standards: Study of Various Indian Standards codes for various important electrical equipment’s, Working standards, check standards and international standards, Definition of metrology, Requirements of traceability, Metrology standardization documents."
          },
          {
            unit: 4,
            topics: "Installation & Commissioning: overview of site management and activities, safety management, power quality, testing of plant and equipment, domestic installation and home appliances, information technology applications in electrical plants, Installing and commissioning engineering equipment’s, Energy and power plants, distribution systems."
          },
          {
            unit: 5,
            topics: "Testing and Maintenance Strategies: site testing and checking, care, servicing and maintenance of motors, maintenance management of rotating machines and EPMP, testing of new & old electrical installation as per IS, Electrical Maintenance and Testing Strategies, Planning an EPM Program, Types of Tests, Types of testing Methods, Protective Relays and Instrument Transformers."
          },
          { unit: 6,
            topics: "Calibration: basics and different Terminologies, Calibration requirements, metrology and calibration services, calibration activities, calibration Record keeping, documented procedures, calibration of equipment’s as per IS specification."
          }
        ]
      },
      {
        code: "ICDC0331",
        name: "Microprocessors and Embedded Systems Laboratory",
        professor: "Dr. Sheela Tiwari",
        credits: 1,
        type: "Lab",
      },
      {
        code: "ICDC0335",
        name: "Analytical and Optical Instrumentation Laboratory",
        professor: "Dr. Deblina Biswas",
        credits: 1,
        type: "Lab",
      },
      {
        code: "ICDC0339",
        name: "Simulation Laboratory",
        professor: "Dr. Amit Kumar",
        credits: 1,
        type: "Lab",
      },
      {
        code: "ICTR0300",
        name: "Industrial Practical Training",
        professor: "Internship",
        credits: 2,
        type: "Project",
      },
      {
        code: "ICPR0301",
        name: "Minor Project (Phase-I)",
        professor: "Dr. Karan Veer",
        credits: 2,
        type: "Project",
      },
    ],
  },
];

// Helper function to calculate total credits
export const getTotalCredits = () => {
  return btechCourses.reduce((total, semester) => {
    return total + semester.courses.reduce((semTotal, course) => semTotal + course.credits, 0);
  }, 0);
};

// Helper function to count total courses
export const getTotalCourses = () => {
  return btechCourses.reduce((total, semester) => total + semester.courses.length, 0);
};
