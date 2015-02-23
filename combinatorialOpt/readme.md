<h1>Combinatorial Optimization</h1>

Many applications, such as scheduling, resource allocation, hardware verification, etc. are most easily solved by rephrasing the problem as a standard combinatorial problem, which is then solved with standard algorithms, yielding a solution whose interpretation is a solution (optimal or approximate) to the original question. We have included several tools for representing and solving combinatorial problems, mostly built with the excellent JaCoP Constraint Satisfaction library. At the moment Algorithmia includes 4 combinatorial optimization algorithms: Graph Coloring, Integer Linear Programming, Binary Integer Linear Programming and Boolean Satisfiability (a user contribution not based on JaCoP). Note that all of these tasks are NP-complete, so they are both very representationally powerful and intractable in some cases - though not, fortunately, in most cases of interest.

The graph coloring problem is to label each node of a graph with an integer such that no two nodes connected by an edge share the same integer, and the number of distinct integers used is minimized. In practice, this is often used to model problems in which there are resources that some number of entities need to use, but cannot use simultaneously. If you have four friends, some of whom dislike each other, you can plan a minimum number of social gatherings such that you get to see everyone and no social gathering includes two enemies. Simple assign a node to each friend, and connect enemies by edges. The number assigned to each node is the party to which you will invite that person. If you had a small and particularly fractious set of friends, you could solve the gathering problem as below.

curl -X POST -d '{"henry":["alice","bob"],"bob":["alice","henry"],"carl":["alice"],"alice":["bob","carl","henry"]}' -H 'Content-Type: application/json' -H 'Authorization: <your API key>' http://api.algorithmia.com/api/JaCoP/GraphColoring

{"henry":"1","bob":"2","carl":"1","alice":"3"}

Integer linear programming optimizes some linear objective function of a set of variables subject to some set of linear constraints. This formulation tends to be convenient for resource allocation problems.

Binary Integer Linear Programming: This is just integer linear programming except the variables must be 0-1 valued. Both formulations are NP-complete, so theoretically are equivalent in expressiveness, but this one is a bit simpler to use and is sufficient for many applications.

Boolean satisfiability is one of the most important canonical NP-complete problems. It is well known, so we avoid further discussion in favor of letting you try it yourself.

curl -X POST -d '"(not b) and (b iff (a xor c)) and (c or a)"' -H 'Content-Type: application/json' -H 'Authorization: 05bcdecceb0a438aa36525e552eeb8c2' http://api.algorithmia.com/api/cloncaric/sat

{"a":true,"b":false,"c":true}

NEED TO MENTION THE GRAPH ALGORITHMS LIKE TSP
