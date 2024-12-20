export interface IKnowledgeBase {
  rid: number;
  knowledgeBaseCategoryRID: number;
  knowledgeBaseCategoryName: string;
  question: string;
  answer: string;
}

export interface IKnowledgeBaseCategory {
  rid: number;
  name: string;
  description: string;
  isDeleted: boolean;
}

export interface IKnowledgeBaseCreateBody {
  knowledgeBaseCategoryRID: number;
  question: string;
  answer: string;
}

export interface IKnowledgeBaseUpdateBody {
  rid: number;
  knowledgeBaseCategoryRID: number;
  question: string;
  answer: string;
}

export interface IKnowledgeBaseCategoryCreateBody {
  name: string;
  description: string;
}


export interface IKnowledgeBaseCategoryUpdateBody {
  rid: number;
  name: string;
  description: string;
}


export interface IKnowledgeBaseDeleteBody {
  knowledgebaseId: number;
}

export interface IKnowledgeBaseCategoryDeleteBody {
  knowledgeCategoryId: number;
}
