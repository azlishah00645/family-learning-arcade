/* ============================================================
   SCIENCE WORLD CONTENT — Year 1 Science (KSSR Semakan, DLP English)
   Used by the Obby Academy Science World checkpoints.

   ✏️ HOW TO EDIT QUESTIONS (no coding needed!):
   1. Every question is ONE line between { and },
   2. To ADD one: copy a whole line (with its comma), paste it,
      change the words in "quotes".
   3. The parts:
        unit:       "U1".."U10" = Course 1..10
        difficulty: 1 = easy, 2 = medium, 3 = hard
                    (each course asks 10: checkpoints 1-4 easy,
                    5-7 medium, 8-10 hard — always rising!)
        question / choices (THREE) / answer (must match a choice
        EXACTLY)
   Keep at least 12 easy + 9 medium + 9 hard per unit so replays
   stay fresh.

   ✏️ HOW TO EDIT STATIONS (the drag/tap mini-games at
   checkpoints 3, 6 and 9): scroll to "stations" at the bottom.
   Each line is one item — copy, paste, edit. The important part
   is the mapping (target / bin / magnetic / absorbs / safe).
   ============================================================ */

window.Y1_SCIENCE_CONTENT = {

questions: [

/* ================= U1 — Scientific Skills (senses) ================= */
/* easy */
{ unit: "U1", difficulty: 1, question: "Which body part do we use to SEE?", choices: ["Eyes", "Ears", "Nose"], answer: "Eyes" },
{ unit: "U1", difficulty: 1, question: "We hear with our ___.", choices: ["ears", "eyes", "hands"], answer: "ears" },
{ unit: "U1", difficulty: 1, question: "We smell with our ___.", choices: ["nose", "tongue", "ears"], answer: "nose" },
{ unit: "U1", difficulty: 1, question: "We taste with our ___.", choices: ["tongue", "nose", "eyes"], answer: "tongue" },
{ unit: "U1", difficulty: 1, question: "We touch and feel with our ___.", choices: ["skin", "ears", "nose"], answer: "skin" },
{ unit: "U1", difficulty: 1, question: "How many senses do we have?", choices: ["5", "3", "10"], answer: "5" },
{ unit: "U1", difficulty: 1, question: "Which one makes a SOUND?", choices: ["A bell", "A pillow", "A paper"], answer: "A bell" },
{ unit: "U1", difficulty: 1, question: "You look at a rainbow. Which sense do you use?", choices: ["Seeing", "Tasting", "Smelling"], answer: "Seeing" },
{ unit: "U1", difficulty: 1, question: "Which body part hears the drum?", choices: ["Ears", "Nose", "Tongue"], answer: "Ears" },
{ unit: "U1", difficulty: 1, question: "Ice cube feels ___.", choices: ["cold", "loud", "sweet"], answer: "cold" },
{ unit: "U1", difficulty: 1, question: "Sugar tastes ___.", choices: ["sweet", "loud", "green"], answer: "sweet" },
{ unit: "U1", difficulty: 1, question: "Which body part smells a flower?", choices: ["Nose", "Ears", "Hands"], answer: "Nose" },
/* medium */
{ unit: "U1", difficulty: 2, question: "You want to know if the water is cold. Which sense do you use?", choices: ["Touch", "Taste", "Hearing"], answer: "Touch" },
{ unit: "U1", difficulty: 2, question: "You want to know if the cake is sweet. Which sense do you use?", choices: ["Taste", "Hearing", "Sight"], answer: "Taste" },
{ unit: "U1", difficulty: 2, question: "A bird is singing. Which sense tells you this?", choices: ["Hearing", "Smell", "Taste"], answer: "Hearing" },
{ unit: "U1", difficulty: 2, question: "The durian smells strong. Which body part knows this?", choices: ["Nose", "Eyes", "Hands"], answer: "Nose" },
{ unit: "U1", difficulty: 2, question: "Ali closes his EARS. What can he NOT do?", choices: ["Hear", "See", "Smell"], answer: "Hear" },
{ unit: "U1", difficulty: 2, question: "Which sense do you use to WATCH a shadow play?", choices: ["Seeing", "Tasting", "Touching"], answer: "Seeing" },
{ unit: "U1", difficulty: 2, question: "Mum sprays perfume. Which sense finds it first?", choices: ["Smell", "Touch", "Taste"], answer: "Smell" },
{ unit: "U1", difficulty: 2, question: "The kitten's fur feels ___.", choices: ["soft", "loud", "sour"], answer: "soft" },
{ unit: "U1", difficulty: 2, question: "You want to know if the soup is salty. Which sense?", choices: ["Taste", "Hearing", "Sight"], answer: "Taste" },
/* hard */
{ unit: "U1", difficulty: 3, question: "You can HEAR it and SEE it, but cannot smell it. What is it?", choices: ["Television", "Flower", "Cake"], answer: "Television" },
{ unit: "U1", difficulty: 3, question: "Which sense tells you a durian is near BEFORE you see it?", choices: ["Smell", "Sight", "Touch"], answer: "Smell" },
{ unit: "U1", difficulty: 3, question: "The room is dark. Which sense helps you find your toy?", choices: ["Touch", "Sight", "Taste"], answer: "Touch" },
{ unit: "U1", difficulty: 3, question: "Mimi tastes a lemon. Her face goes funny because it is ___.", choices: ["sour", "soft", "loud"], answer: "sour" },
{ unit: "U1", difficulty: 3, question: "Which TWO senses do you use most when EATING?", choices: ["Taste and smell", "Hearing and sight", "Touch and hearing"], answer: "Taste and smell" },
{ unit: "U1", difficulty: 3, question: "The phone rings in another room. Which sense tells you?", choices: ["Hearing", "Sight", "Smell"], answer: "Hearing" },
{ unit: "U1", difficulty: 3, question: "You find the cat in the dark by its meow. Which sense?", choices: ["Hearing", "Sight", "Taste"], answer: "Hearing" },
{ unit: "U1", difficulty: 3, question: "Baby smiles when Mum sings. Baby is using his ___.", choices: ["ears", "nose", "tongue"], answer: "ears" },
{ unit: "U1", difficulty: 3, question: "Smoke from the kitchen! Which sense warns you FIRST from far away?", choices: ["Smell", "Taste", "Touch"], answer: "Smell" },

/* ================= U2 — Science Room Rules ================= */
/* easy */
{ unit: "U2", difficulty: 1, question: "Is it safe to RUN in the science room?", choices: ["No", "Yes", "Sometimes"], answer: "No" },
{ unit: "U2", difficulty: 1, question: "Is it safe to LISTEN to the teacher?", choices: ["Yes", "No", "Never"], answer: "Yes" },
{ unit: "U2", difficulty: 1, question: "Can we EAT in the science room?", choices: ["No", "Yes", "Only sweets"], answer: "No" },
{ unit: "U2", difficulty: 1, question: "Can we TASTE things in bottles?", choices: ["No", "Yes", "Only blue ones"], answer: "No" },
{ unit: "U2", difficulty: 1, question: "Is it good to CLEAN UP after an experiment?", choices: ["Yes", "No", "Never"], answer: "Yes" },
{ unit: "U2", difficulty: 1, question: "Is it safe to PUSH your friends in the science room?", choices: ["No", "Yes", "Sometimes"], answer: "No" },
{ unit: "U2", difficulty: 1, question: "Should we WALK slowly in the science room?", choices: ["Yes", "No", "Only on Monday"], answer: "Yes" },
{ unit: "U2", difficulty: 1, question: "Is playing with FIRE safe?", choices: ["No", "Yes", "A little bit"], answer: "No" },
{ unit: "U2", difficulty: 1, question: "Who should we ask before touching science tools?", choices: ["The teacher", "Nobody", "A cat"], answer: "The teacher" },
{ unit: "U2", difficulty: 1, question: "Is it safe to throw scissors to a friend?", choices: ["No", "Yes", "If they catch well"], answer: "No" },
{ unit: "U2", difficulty: 1, question: "Should our hands be CLEAN after an experiment?", choices: ["Yes", "No", "Only one hand"], answer: "Yes" },
{ unit: "U2", difficulty: 1, question: "Is shouting loudly in the science room good?", choices: ["No", "Yes", "Always"], answer: "No" },
/* medium */
{ unit: "U2", difficulty: 2, question: "What should you do FIRST when you enter the science room?", choices: ["Listen to the teacher", "Touch the tools", "Eat snacks"], answer: "Listen to the teacher" },
{ unit: "U2", difficulty: 2, question: "You see a broken glass. What should you do?", choices: ["Tell the teacher", "Pick it up fast", "Kick it away"], answer: "Tell the teacher" },
{ unit: "U2", difficulty: 2, question: "Why do we wear goggles in some experiments?", choices: ["To protect our eyes", "To look cool", "To see rainbows"], answer: "To protect our eyes" },
{ unit: "U2", difficulty: 2, question: "After the experiment, the table is messy. You should ___.", choices: ["clean it up", "go home fast", "hide the mess"], answer: "clean it up" },
{ unit: "U2", difficulty: 2, question: "Your friend wants to smell a strange liquid up close. You say ___.", choices: ["Stop! Ask the teacher first", "Good idea!", "Smell it twice"], answer: "Stop! Ask the teacher first" },
{ unit: "U2", difficulty: 2, question: "Where should your school bag be during an experiment?", choices: ["Away from the table", "On the table", "On your head"], answer: "Away from the table" },
{ unit: "U2", difficulty: 2, question: "When can you touch the science tools?", choices: ["When the teacher says so", "Any time", "When nobody looks"], answer: "When the teacher says so" },
{ unit: "U2", difficulty: 2, question: "You finished your experiment. What do you do with your hands?", choices: ["Wash them", "Lick them", "Wipe them on your friend"], answer: "Wash them" },
{ unit: "U2", difficulty: 2, question: "The scissors are sharp. How do you pass them to a friend?", choices: ["Handle first, slowly", "Throw them", "Point first, fast"], answer: "Handle first, slowly" },
/* hard */
{ unit: "U2", difficulty: 3, question: "Ali TASTED a liquid in the science room. Why is this dangerous?", choices: ["It might be poisonous", "It might taste bad", "It might be cold"], answer: "It might be poisonous" },
{ unit: "U2", difficulty: 3, question: "Water spilled on the floor. What should you do?", choices: ["Tell the teacher and wipe it", "Jump over it all day", "Add more water"], answer: "Tell the teacher and wipe it" },
{ unit: "U2", difficulty: 3, question: "Why is RUNNING in the science room dangerous?", choices: ["You may fall and break things", "Running is too slow", "Shoes get dirty"], answer: "You may fall and break things" },
{ unit: "U2", difficulty: 3, question: "Why do we NOT eat in the science room?", choices: ["Food can mix with chemicals", "Food is too yummy", "Plates are heavy"], answer: "Food can mix with chemicals" },
{ unit: "U2", difficulty: 3, question: "Sara's sleeve is very long and loose. Why is that a problem in experiments?", choices: ["It can knock things over", "It looks pretty", "It keeps her warm"], answer: "It can knock things over" },
{ unit: "U2", difficulty: 3, question: "The teacher is out of the room. What do you do?", choices: ["Wait and do not touch anything", "Start the experiment alone", "Mix all the bottles"], answer: "Wait and do not touch anything" },
{ unit: "U2", difficulty: 3, question: "Why do we clean tools AFTER an experiment?", choices: ["So they are safe for next time", "To make bubbles", "Because water is fun"], answer: "So they are safe for next time" },
{ unit: "U2", difficulty: 3, question: "A bottle has NO label. Should you use it?", choices: ["No — we don't know what is inside", "Yes — mystery is fun", "Yes — if it looks clean"], answer: "No — we don't know what is inside" },
{ unit: "U2", difficulty: 3, question: "Your eye feels itchy during an experiment. What is the SAFEST thing to do?", choices: ["Tell the teacher right away", "Rub it with your hand", "Close both eyes and continue"], answer: "Tell the teacher right away" },

/* ================= U3 — Humans (my senses & body) ================= */
/* easy */
{ unit: "U3", difficulty: 1, question: "How many EYES do we have?", choices: ["2", "1", "4"], answer: "2" },
{ unit: "U3", difficulty: 1, question: "How many EARS do we have?", choices: ["2", "3", "5"], answer: "2" },
{ unit: "U3", difficulty: 1, question: "We see with our ___.", choices: ["eyes", "ears", "hands"], answer: "eyes" },
{ unit: "U3", difficulty: 1, question: "We hear with our ___.", choices: ["ears", "nose", "tongue"], answer: "ears" },
{ unit: "U3", difficulty: 1, question: "Which part is on our FACE?", choices: ["Nose", "Knee", "Toe"], answer: "Nose" },
{ unit: "U3", difficulty: 1, question: "The tongue is inside our ___.", choices: ["mouth", "ear", "shoe"], answer: "mouth" },
{ unit: "U3", difficulty: 1, question: "How many hands do we have?", choices: ["2", "4", "6"], answer: "2" },
{ unit: "U3", difficulty: 1, question: "We walk with our ___.", choices: ["legs", "ears", "nose"], answer: "legs" },
{ unit: "U3", difficulty: 1, question: "Our skin covers our ___.", choices: ["whole body", "teeth", "hair only"], answer: "whole body" },
{ unit: "U3", difficulty: 1, question: "Which body part helps us smell?", choices: ["Nose", "Elbow", "Foot"], answer: "Nose" },
{ unit: "U3", difficulty: 1, question: "We hold a pencil with our ___.", choices: ["fingers", "ears", "hair"], answer: "fingers" },
{ unit: "U3", difficulty: 1, question: "Which part do we use to bite an apple?", choices: ["Teeth", "Ears", "Toes"], answer: "Teeth" },
/* medium */
{ unit: "U3", difficulty: 2, question: "Which part helps us taste ice cream?", choices: ["Tongue", "Ear", "Elbow"], answer: "Tongue" },
{ unit: "U3", difficulty: 2, question: "We use our nose to ___.", choices: ["smell", "hear", "jump"], answer: "smell" },
{ unit: "U3", difficulty: 2, question: "Which part feels the hot sun on our body?", choices: ["Skin", "Teeth", "Hair"], answer: "Skin" },
{ unit: "U3", difficulty: 2, question: "To read a book, we mostly use our ___.", choices: ["eyes", "ears", "feet"], answer: "eyes" },
{ unit: "U3", difficulty: 2, question: "To listen to the radio, we use our ___.", choices: ["ears", "nose", "hands"], answer: "ears" },
{ unit: "U3", difficulty: 2, question: "Which body part knows the rambutan is sweet?", choices: ["Tongue", "Ear", "Knee"], answer: "Tongue" },
{ unit: "U3", difficulty: 2, question: "Which part knows the pillow is soft?", choices: ["Skin", "Ears", "Teeth"], answer: "Skin" },
{ unit: "U3", difficulty: 2, question: "The eye, ear and nose are all on our ___.", choices: ["head", "leg", "hand"], answer: "head" },
{ unit: "U3", difficulty: 2, question: "Which body part tells you Mum is cooking curry?", choices: ["Nose", "Eyes", "Feet"], answer: "Nose" },
/* hard */
{ unit: "U3", difficulty: 3, question: "Sara CLOSES her eyes. Which sense can she NOT use?", choices: ["Sight", "Hearing", "Smell"], answer: "Sight" },
{ unit: "U3", difficulty: 3, question: "Adam covers his nose. What can he NOT do now?", choices: ["Smell the food", "Hear the food", "See the food"], answer: "Smell the food" },
{ unit: "U3", difficulty: 3, question: "Which TWO senses do you use when eating nasi lemak?", choices: ["Taste and smell", "Hearing and touch", "Sight and hearing"], answer: "Taste and smell" },
{ unit: "U3", difficulty: 3, question: "Grandma wears glasses. Which sense do the glasses help?", choices: ["Sight", "Taste", "Smell"], answer: "Sight" },
{ unit: "U3", difficulty: 3, question: "You wear ear muffs. Which sense becomes weaker?", choices: ["Hearing", "Sight", "Taste"], answer: "Hearing" },
{ unit: "U3", difficulty: 3, question: "Which sense works even with eyes closed AND ears covered?", choices: ["Touch", "Sight", "Hearing"], answer: "Touch" },
{ unit: "U3", difficulty: 3, question: "The doctor checks Ali's EARS. Which sense is the doctor caring for?", choices: ["Hearing", "Taste", "Smell"], answer: "Hearing" },
{ unit: "U3", difficulty: 3, question: "Why should we not look straight at the sun?", choices: ["It can hurt our eyes", "The sun gets shy", "Our nose will hurt"], answer: "It can hurt our eyes" },
{ unit: "U3", difficulty: 3, question: "Ice cream on your tongue feels cold AND tastes sweet. Which parts know this?", choices: ["Tongue and skin", "Ears and eyes", "Hair and teeth"], answer: "Tongue and skin" },

/* ================= U4 — Living vs Non-Living ================= */
/* easy */
{ unit: "U4", difficulty: 1, question: "Which one is a LIVING thing?", choices: ["Cat", "Rock", "Chair"], answer: "Cat" },
{ unit: "U4", difficulty: 1, question: "Which one is a LIVING thing?", choices: ["Tree", "Cup", "Ball"], answer: "Tree" },
{ unit: "U4", difficulty: 1, question: "Which one is NOT living?", choices: ["Stone", "Bird", "Fish"], answer: "Stone" },
{ unit: "U4", difficulty: 1, question: "Which one is NOT living?", choices: ["Bicycle", "Chicken", "Flower"], answer: "Bicycle" },
{ unit: "U4", difficulty: 1, question: "Is a fish living?", choices: ["Yes", "No", "Only on Friday"], answer: "Yes" },
{ unit: "U4", difficulty: 1, question: "Is a table living?", choices: ["No", "Yes", "Maybe"], answer: "No" },
{ unit: "U4", difficulty: 1, question: "Which one can GROW?", choices: ["A baby", "A spoon", "A brick"], answer: "A baby" },
{ unit: "U4", difficulty: 1, question: "Which one needs FOOD?", choices: ["A cat", "A car", "A cup"], answer: "A cat" },
{ unit: "U4", difficulty: 1, question: "Which one is living?", choices: ["A butterfly", "A kite", "A shoe"], answer: "A butterfly" },
{ unit: "U4", difficulty: 1, question: "Which one is NOT living?", choices: ["A ball", "A frog", "A bird"], answer: "A ball" },
{ unit: "U4", difficulty: 1, question: "Is a sunflower living?", choices: ["Yes", "No", "Only at night"], answer: "Yes" },
{ unit: "U4", difficulty: 1, question: "Is a pencil living?", choices: ["No", "Yes", "When it writes"], answer: "No" },
/* medium */
{ unit: "U4", difficulty: 2, question: "Living things need ___ to live.", choices: ["food and water", "toys", "television"], answer: "food and water" },
{ unit: "U4", difficulty: 2, question: "A plant is living because it can ___.", choices: ["grow", "talk", "fly"], answer: "grow" },
{ unit: "U4", difficulty: 2, question: "Living things can have ___.", choices: ["babies", "batteries", "buttons"], answer: "babies" },
{ unit: "U4", difficulty: 2, question: "Which one BREATHES?", choices: ["A chicken", "A chair", "A cup"], answer: "A chicken" },
{ unit: "U4", difficulty: 2, question: "A hen lays eggs and the chicks grow. This shows hens are ___.", choices: ["living", "non-living", "plastic"], answer: "living" },
{ unit: "U4", difficulty: 2, question: "Which group is ALL living?", choices: ["Cat, tree, bird", "Cat, rock, cup", "Ball, kite, shoe"], answer: "Cat, tree, bird" },
{ unit: "U4", difficulty: 2, question: "Which group is ALL non-living?", choices: ["Stone, cup, kite", "Fish, stone, cup", "Tree, ball, cat"], answer: "Stone, cup, kite" },
{ unit: "U4", difficulty: 2, question: "What happens if a living thing gets NO water for a long time?", choices: ["It becomes weak", "It grows bigger", "Nothing happens"], answer: "It becomes weak" },
{ unit: "U4", difficulty: 2, question: "A seed becomes a big tree. This shows plants can ___.", choices: ["grow", "sing", "swim"], answer: "grow" },
/* hard */
{ unit: "U4", difficulty: 3, question: "A car can MOVE. Is it living?", choices: ["No — it cannot grow or eat", "Yes — moving means living", "Yes — cars drink petrol"], answer: "No — it cannot grow or eat" },
{ unit: "U4", difficulty: 3, question: "Which one can GROW: a doll, a chick, or a ball?", choices: ["A chick", "A doll", "A ball"], answer: "A chick" },
{ unit: "U4", difficulty: 3, question: "A robot can walk and talk. Is it living?", choices: ["No — it cannot grow or have babies", "Yes — it talks", "Yes — it has legs"], answer: "No — it cannot grow or have babies" },
{ unit: "U4", difficulty: 3, question: "A kite moves in the sky. Why is it NOT living?", choices: ["The wind moves it, not itself", "It is too high", "It is colourful"], answer: "The wind moves it, not itself" },
{ unit: "U4", difficulty: 3, question: "Fire moves and grows bigger. Is fire living?", choices: ["No — it does not eat food or have babies", "Yes — it grows", "Yes — it is warm"], answer: "No — it does not eat food or have babies" },
{ unit: "U4", difficulty: 3, question: "Which is a sign of a LIVING thing?", choices: ["It needs air", "It needs a battery", "It needs paint"], answer: "It needs air" },
{ unit: "U4", difficulty: 3, question: "A dead leaf falls from a tree. The TREE is still ___.", choices: ["living", "non-living", "a rock"], answer: "living" },
{ unit: "U4", difficulty: 3, question: "Ali says his teddy bear is living because it is soft. Is he right?", choices: ["No — soft things are not always living", "Yes — soft means living", "Yes — teddies eat honey"], answer: "No — soft things are not always living" },
{ unit: "U4", difficulty: 3, question: "Which one needs air, food, and water?", choices: ["A goldfish", "A toy fish", "A picture of a fish"], answer: "A goldfish" },

/* ================= U5 — Animals ================= */
/* easy */
{ unit: "U5", difficulty: 1, question: "Which animal can FLY?", choices: ["Bird", "Fish", "Cat"], answer: "Bird" },
{ unit: "U5", difficulty: 1, question: "Which animal lives in WATER?", choices: ["Fish", "Chicken", "Cat"], answer: "Fish" },
{ unit: "U5", difficulty: 1, question: "Which animal says 'meow'?", choices: ["Cat", "Duck", "Cow"], answer: "Cat" },
{ unit: "U5", difficulty: 1, question: "A bird has ___ to fly.", choices: ["wings", "wheels", "fins"], answer: "wings" },
{ unit: "U5", difficulty: 1, question: "A fish has ___ to swim.", choices: ["fins", "legs", "hands"], answer: "fins" },
{ unit: "U5", difficulty: 1, question: "Which animal has a SHELL?", choices: ["Turtle", "Cat", "Bird"], answer: "Turtle" },
{ unit: "U5", difficulty: 1, question: "A cat's body is covered with ___.", choices: ["fur", "feathers", "scales"], answer: "fur" },
{ unit: "U5", difficulty: 1, question: "A chicken's body is covered with ___.", choices: ["feathers", "fur", "shells"], answer: "feathers" },
{ unit: "U5", difficulty: 1, question: "Which animal hops?", choices: ["Frog", "Fish", "Snake"], answer: "Frog" },
{ unit: "U5", difficulty: 1, question: "Which animal is very BIG?", choices: ["Elephant", "Ant", "Mouse"], answer: "Elephant" },
{ unit: "U5", difficulty: 1, question: "A bird eats with its ___.", choices: ["beak", "fingers", "fork"], answer: "beak" },
{ unit: "U5", difficulty: 1, question: "Which animal can climb trees well?", choices: ["Monkey", "Fish", "Duck"], answer: "Monkey" },
/* medium */
{ unit: "U5", difficulty: 2, question: "A fish uses its ___ to swim.", choices: ["fins", "legs", "wings"], answer: "fins" },
{ unit: "U5", difficulty: 2, question: "How does a snake move?", choices: ["It slithers", "It hops", "It flies"], answer: "It slithers" },
{ unit: "U5", difficulty: 2, question: "A fish's body is covered with ___.", choices: ["scales", "fur", "feathers"], answer: "scales" },
{ unit: "U5", difficulty: 2, question: "Which animal walks on FOUR legs?", choices: ["Cat", "Chicken", "Fish"], answer: "Cat" },
{ unit: "U5", difficulty: 2, question: "Which animal walks on TWO legs?", choices: ["Chicken", "Cow", "Goat"], answer: "Chicken" },
{ unit: "U5", difficulty: 2, question: "Where does a fish live?", choices: ["In water", "In a nest", "In a cave"], answer: "In water" },
{ unit: "U5", difficulty: 2, question: "The turtle's hard shell keeps it ___.", choices: ["safe", "hungry", "loud"], answer: "safe" },
{ unit: "U5", difficulty: 2, question: "Which animal gives us eggs?", choices: ["Hen", "Cat", "Goat"], answer: "Hen" },
{ unit: "U5", difficulty: 2, question: "A butterfly moves by ___.", choices: ["flying", "swimming", "slithering"], answer: "flying" },
/* hard */
{ unit: "U5", difficulty: 3, question: "Which animal has feathers AND can swim?", choices: ["Duck", "Eagle", "Cat"], answer: "Duck" },
{ unit: "U5", difficulty: 3, question: "Which animal can live in water AND on land?", choices: ["Frog", "Fish", "Cow"], answer: "Frog" },
{ unit: "U5", difficulty: 3, question: "A penguin is a bird. Why can it NOT fly?", choices: ["Its wings are made for swimming", "It is too shy", "It has no wings"], answer: "Its wings are made for swimming" },
{ unit: "U5", difficulty: 3, question: "Which animal moves WITHOUT any legs?", choices: ["Snake", "Cat", "Chicken"], answer: "Snake" },
{ unit: "U5", difficulty: 3, question: "A bird and a butterfly are alike because both can ___.", choices: ["fly", "swim", "roar"], answer: "fly" },
{ unit: "U5", difficulty: 3, question: "Which covering keeps a cat WARM?", choices: ["Fur", "Scales", "Shell"], answer: "Fur" },
{ unit: "U5", difficulty: 3, question: "Fish cannot live long OUT of water because they ___.", choices: ["breathe in water", "hate the sun", "cannot see air"], answer: "breathe in water" },
{ unit: "U5", difficulty: 3, question: "Which animal uses its long trunk to drink?", choices: ["Elephant", "Rabbit", "Duck"], answer: "Elephant" },
{ unit: "U5", difficulty: 3, question: "A kitten grows up to become a ___.", choices: ["cat", "dog", "bird"], answer: "cat" },

/* ================= U6 — Plants ================= */
/* easy */
{ unit: "U6", difficulty: 1, question: "Which part of the plant is UNDER the ground?", choices: ["Root", "Leaf", "Flower"], answer: "Root" },
{ unit: "U6", difficulty: 1, question: "Leaves are usually what colour?", choices: ["Green", "Blue", "Black"], answer: "Green" },
{ unit: "U6", difficulty: 1, question: "Which part of a plant is pretty and colourful?", choices: ["Flower", "Root", "Stem"], answer: "Flower" },
{ unit: "U6", difficulty: 1, question: "Is a tree a plant?", choices: ["Yes", "No", "Only small ones"], answer: "Yes" },
{ unit: "U6", difficulty: 1, question: "Plants need ___ to grow.", choices: ["water", "candy", "toys"], answer: "water" },
{ unit: "U6", difficulty: 1, question: "Plants also need ___ from the sky.", choices: ["sunlight", "moonrocks", "clouds only"], answer: "sunlight" },
{ unit: "U6", difficulty: 1, question: "Which part holds the plant up straight?", choices: ["Stem", "Flower", "Petal"], answer: "Stem" },
{ unit: "U6", difficulty: 1, question: "Where do plants grow their roots?", choices: ["In the soil", "In the sky", "In a cup of tea"], answer: "In the soil" },
{ unit: "U6", difficulty: 1, question: "A rambutan grows on a ___.", choices: ["tree", "fish", "rock"], answer: "tree" },
{ unit: "U6", difficulty: 1, question: "Which one is a plant?", choices: ["A sunflower", "A cat", "A spoon"], answer: "A sunflower" },
{ unit: "U6", difficulty: 1, question: "The leaf grows on the ___.", choices: ["stem", "root", "cloud"], answer: "stem" },
{ unit: "U6", difficulty: 1, question: "Do plants grow?", choices: ["Yes", "No", "Only in shops"], answer: "Yes" },
/* medium */
{ unit: "U6", difficulty: 2, question: "The ___ carries water up the plant.", choices: ["stem", "flower", "leaf"], answer: "stem" },
{ unit: "U6", difficulty: 2, question: "The ___ takes in water from the soil.", choices: ["root", "flower", "petal"], answer: "root" },
{ unit: "U6", difficulty: 2, question: "Which part of the paddy plant do we eat as rice?", choices: ["The seeds", "The roots", "The flowers"], answer: "The seeds" },
{ unit: "U6", difficulty: 2, question: "A plant kept in a dark cupboard will ___.", choices: ["become weak", "grow faster", "turn purple"], answer: "become weak" },
{ unit: "U6", difficulty: 2, question: "Which part comes FIRST when a seed grows?", choices: ["Root", "Flower", "Fruit"], answer: "Root" },
{ unit: "U6", difficulty: 2, question: "Big trees and small flowers are both ___.", choices: ["plants", "animals", "rocks"], answer: "plants" },
{ unit: "U6", difficulty: 2, question: "What do we call a baby plant growing from a seed?", choices: ["A seedling", "A puppy", "A pebble"], answer: "A seedling" },
{ unit: "U6", difficulty: 2, question: "Which part of the banana plant do we eat?", choices: ["The fruit", "The root", "The stem"], answer: "The fruit" },
{ unit: "U6", difficulty: 2, question: "Grass, bamboo and hibiscus are all ___.", choices: ["plants", "animals", "insects"], answer: "plants" },
/* hard */
{ unit: "U6", difficulty: 3, question: "A plant with NO roots will ___.", choices: ["fall over and get no water", "grow faster", "turn blue"], answer: "fall over and get no water" },
{ unit: "U6", difficulty: 3, question: "Which part makes the plant look colourful to attract insects?", choices: ["Flower", "Root", "Stem"], answer: "Flower" },
{ unit: "U6", difficulty: 3, question: "Why do farmers water their plants every day?", choices: ["Plants need water to live", "To make mud pies", "To clean the leaves only"], answer: "Plants need water to live" },
{ unit: "U6", difficulty: 3, question: "Ali's plant is near the window. Its leaves turn TOWARDS the sun. Why?", choices: ["Plants grow towards light", "The wind pushed them", "Leaves like glass"], answer: "Plants grow towards light" },
{ unit: "U6", difficulty: 3, question: "Which part is like a STRAW for the plant?", choices: ["Stem", "Flower", "Petal"], answer: "Stem" },
{ unit: "U6", difficulty: 3, question: "A flower becomes a ___ after some time.", choices: ["fruit", "rock", "leaf"], answer: "fruit" },
{ unit: "U6", difficulty: 3, question: "Why do plants near the river grow so well?", choices: ["Lots of water for their roots", "Fish sing to them", "The river is blue"], answer: "Lots of water for their roots" },
{ unit: "U6", difficulty: 3, question: "Sara cut ALL the leaves off her plant. The plant became weak. Why?", choices: ["Leaves help the plant make food", "The plant was sad", "Leaves are just decoration"], answer: "Leaves help the plant make food" },
{ unit: "U6", difficulty: 3, question: "Which plant part holds it tight in the soil on a windy day?", choices: ["Root", "Flower", "Fruit"], answer: "Root" },

/* ================= U7 — Magnets ================= */
/* easy */
{ unit: "U7", difficulty: 1, question: "Can a magnet pull a PAPER CLIP?", choices: ["Yes", "No", "Only at night"], answer: "Yes" },
{ unit: "U7", difficulty: 1, question: "Can a magnet pull a LEAF?", choices: ["No", "Yes", "Sometimes"], answer: "No" },
{ unit: "U7", difficulty: 1, question: "Can a magnet pull an IRON NAIL?", choices: ["Yes", "No", "Only big ones"], answer: "Yes" },
{ unit: "U7", difficulty: 1, question: "Can a magnet pull a plastic spoon?", choices: ["No", "Yes", "On Sundays"], answer: "No" },
{ unit: "U7", difficulty: 1, question: "A magnet can ___ some things.", choices: ["pull", "eat", "sing to"], answer: "pull" },
{ unit: "U7", difficulty: 1, question: "Can a magnet pull PAPER?", choices: ["No", "Yes", "Only newspapers"], answer: "No" },
{ unit: "U7", difficulty: 1, question: "Can a magnet pull an ERASER?", choices: ["No", "Yes", "A little"], answer: "No" },
{ unit: "U7", difficulty: 1, question: "A magnet sticks to the ___ door at home.", choices: ["fridge", "wooden", "glass"], answer: "fridge" },
{ unit: "U7", difficulty: 1, question: "Can a magnet pull a steel spoon?", choices: ["Yes", "No", "Never"], answer: "Yes" },
{ unit: "U7", difficulty: 1, question: "Can a magnet pull WATER?", choices: ["No", "Yes", "Only cold water"], answer: "No" },
{ unit: "U7", difficulty: 1, question: "Things a magnet pulls are called ___ things.", choices: ["magnetic", "magic", "yummy"], answer: "magnetic" },
{ unit: "U7", difficulty: 1, question: "Can a magnet pull a safety pin?", choices: ["Yes", "No", "Only open ones"], answer: "Yes" },
/* medium */
{ unit: "U7", difficulty: 2, question: "Which object will a magnet attract?", choices: ["Iron nail", "Leaf", "Eraser"], answer: "Iron nail" },
{ unit: "U7", difficulty: 2, question: "Which object will a magnet NOT attract?", choices: ["Plastic cup", "Paper clip", "Iron nail"], answer: "Plastic cup" },
{ unit: "U7", difficulty: 2, question: "Which group can a magnet pull?", choices: ["Nail, clip, pin", "Leaf, paper, cup", "Sock, ball, crayon"], answer: "Nail, clip, pin" },
{ unit: "U7", difficulty: 2, question: "Magnets attract things made of ___.", choices: ["iron", "wood", "cotton"], answer: "iron" },
{ unit: "U7", difficulty: 2, question: "Some pins fell in the sand. What is the EASIEST way to find them?", choices: ["Use a magnet", "Use a spoon", "Blow the sand"], answer: "Use a magnet" },
{ unit: "U7", difficulty: 2, question: "Which toy probably has a magnet inside?", choices: ["Magnetic fishing game", "Teddy bear", "Skipping rope"], answer: "Magnetic fishing game" },
{ unit: "U7", difficulty: 2, question: "A magnet pulls the pin CLOSER when the pin is ___.", choices: ["near", "far away", "wet"], answer: "near" },
{ unit: "U7", difficulty: 2, question: "Which of these is magnetic?", choices: ["Steel scissors", "Rubber band", "Cotton shirt"], answer: "Steel scissors" },
{ unit: "U7", difficulty: 2, question: "What do we call things a magnet CANNOT pull?", choices: ["Non-magnetic", "Super magnetic", "Invisible"], answer: "Non-magnetic" },
/* hard */
{ unit: "U7", difficulty: 3, question: "Which of these at HOME uses a magnet?", choices: ["Fridge door", "Pillow", "Cup"], answer: "Fridge door" },
{ unit: "U7", difficulty: 3, question: "The magnet did NOT pull the spoon. The spoon is probably made of ___.", choices: ["plastic", "iron", "steel"], answer: "plastic" },
{ unit: "U7", difficulty: 3, question: "The magnet pulled the nail but NOT the coin. What do we know?", choices: ["The nail has iron, the coin may not", "The coin is shy", "The nail is bigger"], answer: "The nail has iron, the coin may not" },
{ unit: "U7", difficulty: 3, question: "Two paper clips: one plastic, one steel. The magnet pulls ___.", choices: ["only the steel one", "only the plastic one", "both the same"], answer: "only the steel one" },
{ unit: "U7", difficulty: 3, question: "Why does the pencil case with a magnet CLICK shut?", choices: ["The magnet pulls the metal part", "The pencil pushes it", "Air closes it"], answer: "The magnet pulls the metal part" },
{ unit: "U7", difficulty: 3, question: "Ali's magnet picks up pins THROUGH a piece of paper. What does this show?", choices: ["Magnets can pull through thin things", "Paper is magnetic", "Pins can fly"], answer: "Magnets can pull through thin things" },
{ unit: "U7", difficulty: 3, question: "Which is the BEST tool to pick up many pins quickly and safely?", choices: ["A magnet", "Your fingers", "A straw"], answer: "A magnet" },
{ unit: "U7", difficulty: 3, question: "A magnet will NOT stick to the wooden cupboard because wood is ___.", choices: ["non-magnetic", "too tall", "too brown"], answer: "non-magnetic" },
{ unit: "U7", difficulty: 3, question: "The fridge magnet holds Ali's drawing up. What is the magnet pulling on?", choices: ["The metal fridge door", "The paper drawing", "The air"], answer: "The metal fridge door" },

/* ================= U8 — Absorption ================= */
/* easy */
{ unit: "U8", difficulty: 1, question: "Which one can SOAK UP water?", choices: ["Tissue", "Marble", "Plastic"], answer: "Tissue" },
{ unit: "U8", difficulty: 1, question: "Which one can soak up water?", choices: ["Sponge", "Glass", "Coin"], answer: "Sponge" },
{ unit: "U8", difficulty: 1, question: "Can a plastic sheet soak up water?", choices: ["No", "Yes", "Only rain"], answer: "No" },
{ unit: "U8", difficulty: 1, question: "Can a towel soak up water?", choices: ["Yes", "No", "Never"], answer: "Yes" },
{ unit: "U8", difficulty: 1, question: "Water on a marble will ___.", choices: ["roll off", "soak in", "disappear fast"], answer: "roll off" },
{ unit: "U8", difficulty: 1, question: "Which one do you use to dry your hands?", choices: ["Towel", "Spoon", "Ruler"], answer: "Towel" },
{ unit: "U8", difficulty: 1, question: "Can a cotton sock soak up water?", choices: ["Yes", "No", "Only left socks"], answer: "Yes" },
{ unit: "U8", difficulty: 1, question: "Can a metal spoon soak up water?", choices: ["No", "Yes", "A little"], answer: "No" },
{ unit: "U8", difficulty: 1, question: "A wet sponge is heavy because it is full of ___.", choices: ["water", "air only", "sand"], answer: "water" },
{ unit: "U8", difficulty: 1, question: "Which one soaks up spilled milk?", choices: ["Kitchen towel", "Glass cup", "Plastic ruler"], answer: "Kitchen towel" },
{ unit: "U8", difficulty: 1, question: "Can a newspaper soak up water?", choices: ["Yes", "No", "Only comics"], answer: "Yes" },
{ unit: "U8", difficulty: 1, question: "Rain on an umbrella will ___.", choices: ["roll off", "soak in", "turn to juice"], answer: "roll off" },
/* medium */
{ unit: "U8", difficulty: 2, question: "You spilled milk. Which is BEST to clean it?", choices: ["Cloth", "Paper clip", "Ruler"], answer: "Cloth" },
{ unit: "U8", difficulty: 2, question: "Which group can ALL soak up water?", choices: ["Tissue, sponge, cloth", "Glass, coin, marble", "Plastic, spoon, ruler"], answer: "Tissue, sponge, cloth" },
{ unit: "U8", difficulty: 2, question: "Which group can NOT soak up water?", choices: ["Plastic, glass, metal", "Tissue, sock, towel", "Sponge, cloth, paper"], answer: "Plastic, glass, metal" },
{ unit: "U8", difficulty: 2, question: "Why do we wear a raincoat and not a paper coat in the rain?", choices: ["Raincoats do not soak up water", "Paper is too expensive", "Raincoats are yellow"], answer: "Raincoats do not soak up water" },
{ unit: "U8", difficulty: 2, question: "The floor is wet. Mum uses a mop because it ___.", choices: ["soaks up the water", "pushes water to hide", "makes water pretty"], answer: "soaks up the water" },
{ unit: "U8", difficulty: 2, question: "Which material is best for a baby's diaper?", choices: ["One that absorbs a lot", "One that absorbs nothing", "One made of glass"], answer: "One that absorbs a lot" },
{ unit: "U8", difficulty: 2, question: "Water stays ON TOP of which material?", choices: ["Plastic sheet", "Tissue paper", "Cotton cloth"], answer: "Plastic sheet" },
{ unit: "U8", difficulty: 2, question: "Another word for 'soak up' is ___.", choices: ["absorb", "bounce", "sing"], answer: "absorb" },
{ unit: "U8", difficulty: 2, question: "Which shirt dries your sweat better?", choices: ["Cotton shirt", "Plastic shirt", "Metal shirt"], answer: "Cotton shirt" },
/* hard */
{ unit: "U8", difficulty: 3, question: "Which absorbs MORE water: a sponge or a plastic sheet?", choices: ["Sponge", "Plastic sheet", "Both the same"], answer: "Sponge" },
{ unit: "U8", difficulty: 3, question: "Why do we use TOWELS after a bath?", choices: ["Towels absorb the water on our body", "Towels are warm like fire", "Towels smell nice only"], answer: "Towels absorb the water on our body" },
{ unit: "U8", difficulty: 3, question: "Ali spilled water. He tried a plastic bag — it did NOT work. Why?", choices: ["Plastic cannot absorb water", "The bag was too small", "Water is too fast"], answer: "Plastic cannot absorb water" },
{ unit: "U8", difficulty: 3, question: "One tissue or one metal tray — which soaks the spill, and why?", choices: ["Tissue, because it absorbs", "Tray, because it is bigger", "Both work the same"], answer: "Tissue, because it absorbs" },
{ unit: "U8", difficulty: 3, question: "Why is the school raincoat made of plastic and NOT cotton?", choices: ["Plastic keeps the rain out", "Plastic is more colourful", "Cotton is too heavy to wear"], answer: "Plastic keeps the rain out" },
{ unit: "U8", difficulty: 3, question: "A small sponge soaked up the WHOLE puddle. What does this show?", choices: ["Sponges can hold lots of water", "Puddles are tiny", "Water likes yellow"], answer: "Sponges can hold lots of water" },
{ unit: "U8", difficulty: 3, question: "Which would you choose to wipe the whiteboard water: cloth or glass sheet?", choices: ["Cloth — it absorbs", "Glass — it shines", "Neither works"], answer: "Cloth — it absorbs" },
{ unit: "U8", difficulty: 3, question: "Grandma dries clothes in the sun. Where does the water GO?", choices: ["Into the air", "Back into the shirt", "Into the ground only"], answer: "Into the air" },
{ unit: "U8", difficulty: 3, question: "Why does Mum put a cloth under the cold water jug?", choices: ["To absorb the water drops", "To make the jug taller", "To hide the table"], answer: "To absorb the water drops" },

/* ================= U9 — Earth ================= */
/* easy */
{ unit: "U9", difficulty: 1, question: "What covers MOST of the Earth?", choices: ["Water", "Land", "Ice cream"], answer: "Water" },
{ unit: "U9", difficulty: 1, question: "A very HIGH land is called a ___.", choices: ["mountain", "river", "beach"], answer: "mountain" },
{ unit: "U9", difficulty: 1, question: "The big salty water is called the ___.", choices: ["sea", "drain", "cup"], answer: "sea" },
{ unit: "U9", difficulty: 1, question: "Water flowing on land is called a ___.", choices: ["river", "mountain", "cloud"], answer: "river" },
{ unit: "U9", difficulty: 1, question: "We stand and walk on ___.", choices: ["land", "clouds", "rainbows"], answer: "land" },
{ unit: "U9", difficulty: 1, question: "The sand next to the sea is called a ___.", choices: ["beach", "mountain", "forest"], answer: "beach" },
{ unit: "U9", difficulty: 1, question: "Plants grow in the ___.", choices: ["soil", "sky", "sea foam"], answer: "soil" },
{ unit: "U9", difficulty: 1, question: "A place with MANY trees is a ___.", choices: ["forest", "beach", "desert"], answer: "forest" },
{ unit: "U9", difficulty: 1, question: "Which one is WATER on Earth?", choices: ["The sea", "A mountain", "A rock"], answer: "The sea" },
{ unit: "U9", difficulty: 1, question: "Which one is LAND on Earth?", choices: ["A hill", "The sea", "A river"], answer: "A hill" },
{ unit: "U9", difficulty: 1, question: "Where do we build houses?", choices: ["On land", "On clouds", "Under the sea"], answer: "On land" },
{ unit: "U9", difficulty: 1, question: "Rocks and soil are found on ___.", choices: ["land", "the moon only", "rainbows"], answer: "land" },
/* medium */
{ unit: "U9", difficulty: 2, question: "Which is BIGGER on Earth: the sea or the land?", choices: ["The sea", "The land", "Both the same"], answer: "The sea" },
{ unit: "U9", difficulty: 2, question: "Which animal lives IN the sea?", choices: ["Fish", "Cat", "Chicken"], answer: "Fish" },
{ unit: "U9", difficulty: 2, question: "A small mountain is called a ___.", choices: ["hill", "puddle", "cave"], answer: "hill" },
{ unit: "U9", difficulty: 2, question: "Rivers flow from the mountains to the ___.", choices: ["sea", "sky", "moon"], answer: "sea" },
{ unit: "U9", difficulty: 2, question: "Which one is the TALLEST?", choices: ["A mountain", "A hill", "A beach"], answer: "A mountain" },
{ unit: "U9", difficulty: 2, question: "Sea water tastes ___.", choices: ["salty", "sweet", "like tea"], answer: "salty" },
{ unit: "U9", difficulty: 2, question: "Boats travel on ___.", choices: ["water", "mountains", "trees"], answer: "water" },
{ unit: "U9", difficulty: 2, question: "Which place has LOTS of sand?", choices: ["The beach", "The forest", "The classroom"], answer: "The beach" },
{ unit: "U9", difficulty: 2, question: "What do we call a low land between hills?", choices: ["A valley", "A rooftop", "A cloud"], answer: "A valley" },
/* hard */
{ unit: "U9", difficulty: 3, question: "Where does a fish live: on a mountain, in the sea, or in the sand?", choices: ["In the sea", "On a mountain", "In the sand"], answer: "In the sea" },
{ unit: "U9", difficulty: 3, question: "Which one is NOT found on Earth's surface?", choices: ["The moon", "A river", "A mountain"], answer: "The moon" },
{ unit: "U9", difficulty: 3, question: "Why can't we drink sea water?", choices: ["It is too salty", "It is too cold", "Fish said no"], answer: "It is too salty" },
{ unit: "U9", difficulty: 3, question: "A mountain goat and a fish — where does EACH belong?", choices: ["Goat on land, fish in water", "Both in the sea", "Both on the mountain"], answer: "Goat on land, fish in water" },
{ unit: "U9", difficulty: 3, question: "It rains on the mountain. Where does the rain water flow?", choices: ["Down to the river", "Up to the sky", "It stays still forever"], answer: "Down to the river" },
{ unit: "U9", difficulty: 3, question: "Which is the SAFEST place to build a sandcastle?", choices: ["The beach", "A mountain top", "The middle of a river"], answer: "The beach" },
{ unit: "U9", difficulty: 3, question: "Malaysia has land AND sea. Which do fishermen work on?", choices: ["The sea", "The hills", "The roads"], answer: "The sea" },
{ unit: "U9", difficulty: 3, question: "From a mountain top you look down. What do you see below?", choices: ["Land and rivers", "Only stars", "The bottom of the sea"], answer: "Land and rivers" },
{ unit: "U9", difficulty: 3, question: "Which list is ALL water places?", choices: ["Sea, river, lake", "Hill, beach, forest", "Mountain, valley, cave"], answer: "Sea, river, lake" },

/* ================= U10 — Technology ================= */
/* easy */
{ unit: "U10", difficulty: 1, question: "Which tool helps us CUT paper?", choices: ["Scissors", "Spoon", "Pillow"], answer: "Scissors" },
{ unit: "U10", difficulty: 1, question: "Which tool helps us WRITE?", choices: ["Pencil", "Ball", "Sock"], answer: "Pencil" },
{ unit: "U10", difficulty: 1, question: "Which one tells us the TIME?", choices: ["Clock", "Chair", "Shoe"], answer: "Clock" },
{ unit: "U10", difficulty: 1, question: "Which tool measures how LONG something is?", choices: ["Ruler", "Cup", "Hat"], answer: "Ruler" },
{ unit: "U10", difficulty: 1, question: "We eat soup with a ___.", choices: ["spoon", "ruler", "crayon"], answer: "spoon" },
{ unit: "U10", difficulty: 1, question: "Which one keeps our food COLD?", choices: ["Fridge", "Oven", "Basket"], answer: "Fridge" },
{ unit: "U10", difficulty: 1, question: "Which one gives us LIGHT at night?", choices: ["Lamp", "Pillow", "Carpet"], answer: "Lamp" },
{ unit: "U10", difficulty: 1, question: "We sweep the floor with a ___.", choices: ["broom", "fork", "book"], answer: "broom" },
{ unit: "U10", difficulty: 1, question: "Which one takes us to school on wheels?", choices: ["A bus", "A boat", "A kite"], answer: "A bus" },
{ unit: "U10", difficulty: 1, question: "Which tool holds papers together?", choices: ["Paper clip", "Banana", "Ball"], answer: "Paper clip" },
{ unit: "U10", difficulty: 1, question: "We open a locked door with a ___.", choices: ["key", "leaf", "cake"], answer: "key" },
{ unit: "U10", difficulty: 1, question: "Which one washes our clothes?", choices: ["Washing machine", "Television", "Toy box"], answer: "Washing machine" },
/* medium */
{ unit: "U10", difficulty: 2, question: "Which technology helps us TALK to Grandma far away?", choices: ["Phone", "Chair", "Shoe"], answer: "Phone" },
{ unit: "U10", difficulty: 2, question: "Which tool helps a farmer DIG the soil?", choices: ["A hoe", "A pillow", "A straw"], answer: "A hoe" },
{ unit: "U10", difficulty: 2, question: "Which one helps us cross a river?", choices: ["A bridge", "A ladder", "A blanket"], answer: "A bridge" },
{ unit: "U10", difficulty: 2, question: "Which one helps us carry MANY heavy things?", choices: ["A trolley", "A spoon", "A crayon"], answer: "A trolley" },
{ unit: "U10", difficulty: 2, question: "An umbrella is technology that keeps us ___.", choices: ["dry in the rain", "fast like a car", "invisible"], answer: "dry in the rain" },
{ unit: "U10", difficulty: 2, question: "Which one cooks our rice?", choices: ["Rice cooker", "School bag", "Fan"], answer: "Rice cooker" },
{ unit: "U10", difficulty: 2, question: "Which tool is best to STICK two papers together?", choices: ["Glue", "Water", "Sand"], answer: "Glue" },
{ unit: "U10", difficulty: 2, question: "A fan helps us when the day is ___.", choices: ["hot", "rainy", "dark"], answer: "hot" },
{ unit: "U10", difficulty: 2, question: "Which one helps sick people the MOST?", choices: ["An ambulance", "A kite", "A drum"], answer: "An ambulance" },
/* hard */
{ unit: "U10", difficulty: 3, question: "Why do we build a BRIDGE across a river?", choices: ["To cross safely without a boat", "To make the river pretty", "To stop the fish"], answer: "To cross safely without a boat" },
{ unit: "U10", difficulty: 3, question: "Which is the BEST tool to see TINY things?", choices: ["Magnifying glass", "Hammer", "Basket"], answer: "Magnifying glass" },
{ unit: "U10", difficulty: 3, question: "Which is the BEST tool to see things FAR away?", choices: ["Binoculars", "A spoon", "A mirror"], answer: "Binoculars" },
{ unit: "U10", difficulty: 3, question: "It is raining and Ali must go out. Which TWO things help him?", choices: ["Umbrella and raincoat", "Fan and sunglasses", "Kite and whistle"], answer: "Umbrella and raincoat" },
{ unit: "U10", difficulty: 3, question: "Why is a wheelbarrow better than carrying bricks by hand?", choices: ["It moves heavy things easily", "It is orange", "Bricks like wheels"], answer: "It moves heavy things easily" },
{ unit: "U10", difficulty: 3, question: "The lights went out! Which tool helps you see?", choices: ["A torchlight", "Sunglasses", "A whistle"], answer: "A torchlight" },
{ unit: "U10", difficulty: 3, question: "Which tool matches its job: cutting grass?", choices: ["Grass cutter", "Hair dryer", "Toaster"], answer: "Grass cutter" },
{ unit: "U10", difficulty: 3, question: "Why do builders follow a PLAN before building a house?", choices: ["So the house is built correctly", "Plans are colourful", "Paper is cheap"], answer: "So the house is built correctly" },
{ unit: "U10", difficulty: 3, question: "A washing machine and washing by hand — why do many people choose the machine?", choices: ["It saves time and energy", "It sings songs", "Clothes taste better"], answer: "It saves time and energy" }
],

/* ============================================================
   STATIONS — the drag/tap mini-games at checkpoints 3, 6 and 9.
   Each item is one line: copy, paste, edit. The game picks a
   few random items each time so replays feel fresh.
   ============================================================ */
stations: {

  U1: { type: "dragTargets", title: "Drag each thing to the SENSE you use!",
    targets: [
      { id: "eyes",   label: "Eyes — see" },
      { id: "ears",   label: "Ears — hear" },
      { id: "nose",   label: "Nose — smell" },
      { id: "tongue", label: "Tongue — taste" },
      { id: "hand",   label: "Hand — touch" }
    ],
    items: [
      { label: "rainbow",     target: "eyes" },
      { label: "ringing bell", target: "ears" },
      { label: "durian",      target: "nose" },
      { label: "ice cube",    target: "hand" },
      { label: "loud drum",   target: "ears" },
      { label: "sweet candy", target: "tongue" },
      { label: "perfume",     target: "nose" },
      { label: "full moon",   target: "eyes" },
      { label: "soft teddy",  target: "hand" },
      { label: "sour lemon",  target: "tongue" }
    ] },

  U2: { type: "tapWrong", title: "Tap ALL the things that are NOT SAFE in the science room!",
    items: [
      { label: "Running fast",          safe: false },
      { label: "Wearing goggles",       safe: true },
      { label: "Tasting a liquid",      safe: false },
      { label: "Listening to teacher",  safe: true },
      { label: "Pushing friends",       safe: false },
      { label: "Walking slowly",        safe: true },
      { label: "Playing with fire",     safe: false },
      { label: "Cleaning the table",    safe: true },
      { label: "Throwing scissors",     safe: false },
      { label: "Washing hands",         safe: true }
    ] },

  U3: { type: "dragTargets", title: "Drag each SENSE to the body part that does it!",
    targets: [
      { id: "eye",    label: "Eye" },
      { id: "ear",    label: "Ear" },
      { id: "nose",   label: "Nose" },
      { id: "tongue", label: "Tongue" },
      { id: "hand",   label: "Hand" }
    ],
    items: [
      { label: "SEE",   target: "eye" },
      { label: "HEAR",  target: "ear" },
      { label: "SMELL", target: "nose" },
      { label: "TASTE", target: "tongue" },
      { label: "TOUCH", target: "hand" }
    ] },

  U4: { type: "binSort", title: "LIVING or NON-LIVING? Sort them into the right bin!",
    bins: [
      { id: "living",    label: "LIVING" },
      { id: "nonliving", label: "NON-LIVING" }
    ],
    items: [
      { label: "cat",      bin: "living" },
      { label: "kite",     bin: "nonliving" },
      { label: "tree",     bin: "living" },
      { label: "bicycle",  bin: "nonliving" },
      { label: "bird",     bin: "living" },
      { label: "stone",    bin: "nonliving" },
      { label: "fish",     bin: "living" },
      { label: "ball",     bin: "nonliving" },
      { label: "flower",   bin: "living" },
      { label: "cup",      bin: "nonliving" }
    ] },

  U5: { type: "dragTargets", title: "Drag each body part to the RIGHT animal!",
    targets: [
      { id: "bird",   label: "Bird" },
      { id: "fish",   label: "Fish" },
      { id: "turtle", label: "Turtle" },
      { id: "cat",    label: "Cat" }
    ],
    items: [
      { label: "wing",     target: "bird" },
      { label: "beak",     target: "bird" },
      { label: "fin",      target: "fish" },
      { label: "scales",   target: "fish" },
      { label: "shell",    target: "turtle" },
      { label: "fur",      target: "cat" },
      { label: "whiskers", target: "cat" }
    ] },

  U6: { type: "buildSlots", title: "Build the plant! Drag each part to its place.",
    slots: [
      { id: "flower", label: "Flower", x: 50, y: 8 },
      { id: "leaf",   label: "Leaf",   x: 77, y: 38 },
      { id: "stem",   label: "Stem",   x: 50, y: 50 },
      { id: "root",   label: "Root",   x: 50, y: 84 }
    ],
    items: [
      { label: "flower", target: "flower" },
      { label: "leaf",   target: "leaf" },
      { label: "stem",   target: "stem" },
      { label: "root",   target: "root" }
    ] },

  U7: { type: "magnet", title: "Swing the magnet past everything — then tap all the things it PULLED!",
    items: [
      { label: "paper clip",    magnetic: true },
      { label: "eraser",        magnetic: false },
      { label: "iron nail",     magnetic: true },
      { label: "leaf",          magnetic: false },
      { label: "steel spoon",   magnetic: true },
      { label: "plastic spoon", magnetic: false },
      { label: "safety pin",    magnetic: true },
      { label: "paper",         magnetic: false }
    ] },

  U8: { type: "predict", title: "Will it SOAK UP the water? Predict, then watch!",
    items: [
      { label: "tissue",        absorbs: true },
      { label: "cloth",         absorbs: true },
      { label: "sponge",        absorbs: true },
      { label: "plastic sheet", absorbs: false },
      { label: "marble",        absorbs: false },
      { label: "cotton sock",   absorbs: true },
      { label: "metal tray",    absorbs: false },
      { label: "newspaper",     absorbs: true }
    ] },

  U9: { type: "tapFind", title: "Find it on the Earth scene!",
    scene: [
      { id: "sea",      label: "sea",      x: 74, y: 62 },
      { id: "mountain", label: "mountain", x: 20, y: 14 },
      { id: "river",    label: "river",    x: 46, y: 40 },
      { id: "land",     label: "field",    x: 18, y: 64 },
      { id: "beach",    label: "beach",    x: 74, y: 18 }
    ],
    finds: [
      { id: "sea",      prompt: "Tap the SEA! (big salty water)" },
      { id: "mountain", prompt: "Tap the MOUNTAIN! (very high land)" },
      { id: "river",    prompt: "Tap the RIVER! (water flowing on land)" },
      { id: "land",     prompt: "Tap the FIELD! (flat land)" },
      { id: "beach",    prompt: "Tap the BEACH! (sand near the sea)" }
    ] },

  U10: { type: "buildSlots", title: "Build the tower like the plan: RED on top, YELLOW in the middle, BLUE at the base!",
    slots: [
      { id: "top",    label: "Top",    x: 50, y: 10 },
      { id: "middle", label: "Middle", x: 50, y: 44 },
      { id: "base",   label: "Base",   x: 50, y: 78 }
    ],
    items: [
      { label: "RED block",    target: "top" },
      { label: "YELLOW block", target: "middle" },
      { label: "BLUE block",   target: "base" }
    ] }
}
};
