---
title: Graph Neural Network
layout: minimal
---

# Graph Neural Network

[A really good blog introduction](https://distill.pub/2021/gnn-intro/)

[A really good explaination video](https://www.youtube.com/playlist?list=PLV8yxwGOxvvoNkzPfCx2i8an--Tkt7O8Z)

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

![Update graph](/assets/images/graph_update.png)

## Fundamental idea of GNN

The whole point of GNN is to find a __suitable representation of the graph data__ for neural network.

## Pooling information

__Example: Predict node labels__

* Have node features? -> Linear classifier work just fine
* No node features? -> Pooling information from neighbors edges and give it to node

Also works for:
* Node -> Edge
    * Just like above but in reverse
* Node -> Graph
    * We can use __global pooling__ to pool information from all nodes in the graph.

## Passing messages

* Using graph connectivity to update information
  * Information of a node is updated by its neighbors. Graddually, "every single node of the graph knows something about all other nodes." [Youtube video](https://www.youtube.com/watch?v=ABCGCf8cJOE)
  * Same for edges  

## Some note

### About message passing network that torch.geometric.nn.MessagePassing support

* GCNConv
  * Focus on embedding nodes
  * NOT natually support edge features and directed edges
* SAGEConv
  * Node embedding in __large graph__
* ChebConv
  * High dimensional dataset

### About graph

* Graph is permutation invariant
  * If we permute the nodes, the graph is still the same
  * If we permute the edges, the graph is still the same

=> So we cannot use adjacency matrix as input 

### About hyperparameters

* Number of layers (depth)

* Aggregation function (sum, mean, max, min, etc)

* Embedding dimension of nodes, edges, graphs

Even different ways of featurizing & constructing the graph can lead to different results

### About global graph pooling

One difficulty: neural networks expected fix size input

* Solution: global pooling
  * Each graph has different number of nodes but has the same number of features

![global pooling](/assets/images/global_pooling.png)
