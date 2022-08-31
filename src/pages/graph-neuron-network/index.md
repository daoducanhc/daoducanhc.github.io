---
title: Graph Neuron Network
layout: minimal
---

# Graph Neuron Network

[Really good tutorial](https://distill.pub/2021/gnn-intro/)

## Workflow

__Graph-in, graph-out__ mechanism

* Input:
  * Graph: adjacency matrix
  * Features: node features
  * Labels: node labels
  * Weights: edge weights

In __each layer__, we update the embedded information in:
* Node
* Edge
* Graph (global-context)

without changing the connectivity of the graph.

![Update graph](/src/assets/images/graph_update.png)


## Pooling information

__Example: Predict node labels__

* Have node features? -> Linear classifier work just fine
* No node features? -> Pooling information from neighbors edges and give it to node

Also works for:
* Node -> Edge
    * Just like above but in reverse
* Node -> Graph
    * We can use __global pooling__ to pool information from all nodes in the graph.