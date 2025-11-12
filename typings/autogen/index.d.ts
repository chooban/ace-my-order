export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  /** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
  ID: string;
  /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
  String: string;
  /** The `Boolean` scalar type represents `true` or `false`. */
  Boolean: boolean;
  /** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
  Int: number;
  /** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). */
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type File = Node & {
  sourceInstanceName: Scalars['String'];
  absolutePath: Scalars['String'];
  relativePath: Scalars['String'];
  extension: Scalars['String'];
  size: Scalars['Int'];
  prettySize: Scalars['String'];
  modifiedTime: Scalars['Date'];
  accessTime: Scalars['Date'];
  changeTime: Scalars['Date'];
  birthTime: Scalars['Date'];
  root: Scalars['String'];
  dir: Scalars['String'];
  base: Scalars['String'];
  ext: Scalars['String'];
  name: Scalars['String'];
  relativeDirectory: Scalars['String'];
  dev: Scalars['Int'];
  mode: Scalars['Int'];
  nlink: Scalars['Int'];
  uid: Scalars['Int'];
  gid: Scalars['Int'];
  rdev: Scalars['Int'];
  ino: Scalars['Float'];
  atimeMs: Scalars['Float'];
  mtimeMs: Scalars['Float'];
  ctimeMs: Scalars['Float'];
  atime: Scalars['Date'];
  mtime: Scalars['Date'];
  ctime: Scalars['Date'];
  /** @deprecated Use `birthTime` instead */
  birthtime?: Maybe<Scalars['Date']>;
  /** @deprecated Use `birthTime` instead */
  birthtimeMs?: Maybe<Scalars['Float']>;
  blksize?: Maybe<Scalars['Int']>;
  blocks?: Maybe<Scalars['Int']>;
  /** Copy file to static directory and return public url to it */
  publicURL?: Maybe<Scalars['String']>;
  /** Returns all children nodes filtered by type AceItem */
  childrenAceItem?: Maybe<Array<Maybe<AceItem>>>;
  /** Returns the first child node of type AceItem or null if there are no children of given type on this node */
  childAceItem?: Maybe<AceItem>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type FilemodifiedTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type FileaccessTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type FilechangeTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type FilebirthTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type FileatimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type FilemtimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type FilectimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};

/** Node Interface */
export type Node = {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};

export type Internal = {
  content?: Maybe<Scalars['String']>;
  contentDigest: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  fieldOwners?: Maybe<Array<Maybe<Scalars['String']>>>;
  ignoreType?: Maybe<Scalars['Boolean']>;
  mediaType?: Maybe<Scalars['String']>;
  owner: Scalars['String'];
  type: Scalars['String'];
  contentFilePath?: Maybe<Scalars['String']>;
};

export type Directory = Node & {
  sourceInstanceName: Scalars['String'];
  absolutePath: Scalars['String'];
  relativePath: Scalars['String'];
  extension: Scalars['String'];
  size: Scalars['Int'];
  prettySize: Scalars['String'];
  modifiedTime: Scalars['Date'];
  accessTime: Scalars['Date'];
  changeTime: Scalars['Date'];
  birthTime: Scalars['Date'];
  root: Scalars['String'];
  dir: Scalars['String'];
  base: Scalars['String'];
  ext: Scalars['String'];
  name: Scalars['String'];
  relativeDirectory: Scalars['String'];
  dev: Scalars['Int'];
  mode: Scalars['Int'];
  nlink: Scalars['Int'];
  uid: Scalars['Int'];
  gid: Scalars['Int'];
  rdev: Scalars['Int'];
  ino: Scalars['Float'];
  atimeMs: Scalars['Float'];
  mtimeMs: Scalars['Float'];
  ctimeMs: Scalars['Float'];
  atime: Scalars['Date'];
  mtime: Scalars['Date'];
  ctime: Scalars['Date'];
  /** @deprecated Use `birthTime` instead */
  birthtime?: Maybe<Scalars['Date']>;
  /** @deprecated Use `birthTime` instead */
  birthtimeMs?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type DirectorymodifiedTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type DirectoryaccessTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type DirectorychangeTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type DirectorybirthTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type DirectoryatimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type DirectorymtimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type DirectoryctimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type Site = Node & {
  buildTime?: Maybe<Scalars['Date']>;
  siteMetadata?: Maybe<SiteSiteMetadata>;
  port?: Maybe<Scalars['Int']>;
  host?: Maybe<Scalars['String']>;
  polyfill?: Maybe<Scalars['Boolean']>;
  pathPrefix?: Maybe<Scalars['String']>;
  jsxRuntime?: Maybe<Scalars['String']>;
  trailingSlash?: Maybe<Scalars['String']>;
  graphqlTypegen?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type SitebuildTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type SiteSiteMetadata = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  twitterUsername?: Maybe<Scalars['String']>;
  titleTemplate?: Maybe<Scalars['String']>;
};

export type SiteFunction = Node & {
  functionRoute: Scalars['String'];
  pluginName: Scalars['String'];
  originalAbsoluteFilePath: Scalars['String'];
  originalRelativeFilePath: Scalars['String'];
  relativeCompiledFilePath: Scalars['String'];
  absoluteCompiledFilePath: Scalars['String'];
  matchPath?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};

export type SitePage = Node & {
  path: Scalars['String'];
  component: Scalars['String'];
  internalComponentName: Scalars['String'];
  componentChunkName: Scalars['String'];
  matchPath?: Maybe<Scalars['String']>;
  pageContext?: Maybe<Scalars['JSON']>;
  pluginCreator?: Maybe<SitePlugin>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};

export type SitePlugin = Node & {
  resolve?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  nodeAPIs?: Maybe<Array<Maybe<Scalars['String']>>>;
  browserAPIs?: Maybe<Array<Maybe<Scalars['String']>>>;
  ssrAPIs?: Maybe<Array<Maybe<Scalars['String']>>>;
  pluginFilepath?: Maybe<Scalars['String']>;
  pluginOptions?: Maybe<Scalars['JSON']>;
  packageJson?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};

export type SiteBuildMetadata = Node & {
  buildTime?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type SiteBuildMetadatabuildTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type LocalSearchCatalogue = Node & {
  /** The name of the index. */
  name: Scalars['String'];
  /** The search engine used to create the index. */
  engine: Scalars['String'];
  /** The search index created using the selected engine. */
  index: Scalars['String'];
  /** A JSON object used to map search results to their data. */
  store: Scalars['JSON'];
  /** Save the index to the site's static directory and return a public URL to it. */
  publicIndexURL: Scalars['String'];
  /** Save the store to the site's static directory and return a public URL to it. */
  publicStoreURL: Scalars['String'];
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};

export type PreviewsItem = Node & {
  isMature: Scalars['Boolean'];
  isOfferedAgain: Scalars['Boolean'];
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};

export type AceItem = Node & {
  previewsCode: Scalars['String'];
  price: Scalars['Float'];
  publisher: Scalars['String'];
  slug: Scalars['String'];
  title: Scalars['String'];
  catalogueId: Scalars['String'];
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  description?: Maybe<Scalars['String']>;
  isMature?: Maybe<Scalars['Boolean']>;
  isOfferedAgain?: Maybe<Scalars['Boolean']>;
  creators?: Maybe<Scalars['String']>;
  coverThumbnail?: Maybe<Scalars['String']>;
  previews?: Maybe<PreviewsItem>;
  lunar?: Maybe<LunarItem>;
};

export type LunarItem = Node & {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  coverThumbnail?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  creators?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  isMature?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  file?: Maybe<File>;
  allFile: FileConnection;
  directory?: Maybe<Directory>;
  allDirectory: DirectoryConnection;
  site?: Maybe<Site>;
  allSite: SiteConnection;
  siteFunction?: Maybe<SiteFunction>;
  allSiteFunction: SiteFunctionConnection;
  sitePage?: Maybe<SitePage>;
  allSitePage: SitePageConnection;
  sitePlugin?: Maybe<SitePlugin>;
  allSitePlugin: SitePluginConnection;
  siteBuildMetadata?: Maybe<SiteBuildMetadata>;
  allSiteBuildMetadata: SiteBuildMetadataConnection;
  localSearchCatalogue?: Maybe<LocalSearchCatalogue>;
  allLocalSearchCatalogue: LocalSearchCatalogueConnection;
  previewsItem?: Maybe<PreviewsItem>;
  allPreviewsItem: PreviewsItemConnection;
  aceItem?: Maybe<AceItem>;
  allAceItem: AceItemConnection;
  lunarItem?: Maybe<LunarItem>;
  allLunarItem: LunarItemConnection;
};


export type QueryfileArgs = {
  sourceInstanceName?: InputMaybe<StringQueryOperatorInput>;
  absolutePath?: InputMaybe<StringQueryOperatorInput>;
  relativePath?: InputMaybe<StringQueryOperatorInput>;
  extension?: InputMaybe<StringQueryOperatorInput>;
  size?: InputMaybe<IntQueryOperatorInput>;
  prettySize?: InputMaybe<StringQueryOperatorInput>;
  modifiedTime?: InputMaybe<DateQueryOperatorInput>;
  accessTime?: InputMaybe<DateQueryOperatorInput>;
  changeTime?: InputMaybe<DateQueryOperatorInput>;
  birthTime?: InputMaybe<DateQueryOperatorInput>;
  root?: InputMaybe<StringQueryOperatorInput>;
  dir?: InputMaybe<StringQueryOperatorInput>;
  base?: InputMaybe<StringQueryOperatorInput>;
  ext?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  relativeDirectory?: InputMaybe<StringQueryOperatorInput>;
  dev?: InputMaybe<IntQueryOperatorInput>;
  mode?: InputMaybe<IntQueryOperatorInput>;
  nlink?: InputMaybe<IntQueryOperatorInput>;
  uid?: InputMaybe<IntQueryOperatorInput>;
  gid?: InputMaybe<IntQueryOperatorInput>;
  rdev?: InputMaybe<IntQueryOperatorInput>;
  ino?: InputMaybe<FloatQueryOperatorInput>;
  atimeMs?: InputMaybe<FloatQueryOperatorInput>;
  mtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  ctimeMs?: InputMaybe<FloatQueryOperatorInput>;
  atime?: InputMaybe<DateQueryOperatorInput>;
  mtime?: InputMaybe<DateQueryOperatorInput>;
  ctime?: InputMaybe<DateQueryOperatorInput>;
  birthtime?: InputMaybe<DateQueryOperatorInput>;
  birthtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  blksize?: InputMaybe<IntQueryOperatorInput>;
  blocks?: InputMaybe<IntQueryOperatorInput>;
  publicURL?: InputMaybe<StringQueryOperatorInput>;
  childrenAceItem?: InputMaybe<AceItemFilterListInput>;
  childAceItem?: InputMaybe<AceItemFilterInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryallFileArgs = {
  filter?: InputMaybe<FileFilterInput>;
  sort?: InputMaybe<Array<InputMaybe<FileSortInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QuerydirectoryArgs = {
  sourceInstanceName?: InputMaybe<StringQueryOperatorInput>;
  absolutePath?: InputMaybe<StringQueryOperatorInput>;
  relativePath?: InputMaybe<StringQueryOperatorInput>;
  extension?: InputMaybe<StringQueryOperatorInput>;
  size?: InputMaybe<IntQueryOperatorInput>;
  prettySize?: InputMaybe<StringQueryOperatorInput>;
  modifiedTime?: InputMaybe<DateQueryOperatorInput>;
  accessTime?: InputMaybe<DateQueryOperatorInput>;
  changeTime?: InputMaybe<DateQueryOperatorInput>;
  birthTime?: InputMaybe<DateQueryOperatorInput>;
  root?: InputMaybe<StringQueryOperatorInput>;
  dir?: InputMaybe<StringQueryOperatorInput>;
  base?: InputMaybe<StringQueryOperatorInput>;
  ext?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  relativeDirectory?: InputMaybe<StringQueryOperatorInput>;
  dev?: InputMaybe<IntQueryOperatorInput>;
  mode?: InputMaybe<IntQueryOperatorInput>;
  nlink?: InputMaybe<IntQueryOperatorInput>;
  uid?: InputMaybe<IntQueryOperatorInput>;
  gid?: InputMaybe<IntQueryOperatorInput>;
  rdev?: InputMaybe<IntQueryOperatorInput>;
  ino?: InputMaybe<FloatQueryOperatorInput>;
  atimeMs?: InputMaybe<FloatQueryOperatorInput>;
  mtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  ctimeMs?: InputMaybe<FloatQueryOperatorInput>;
  atime?: InputMaybe<DateQueryOperatorInput>;
  mtime?: InputMaybe<DateQueryOperatorInput>;
  ctime?: InputMaybe<DateQueryOperatorInput>;
  birthtime?: InputMaybe<DateQueryOperatorInput>;
  birthtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryallDirectoryArgs = {
  filter?: InputMaybe<DirectoryFilterInput>;
  sort?: InputMaybe<Array<InputMaybe<DirectorySortInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QuerysiteArgs = {
  buildTime?: InputMaybe<DateQueryOperatorInput>;
  siteMetadata?: InputMaybe<SiteSiteMetadataFilterInput>;
  port?: InputMaybe<IntQueryOperatorInput>;
  host?: InputMaybe<StringQueryOperatorInput>;
  polyfill?: InputMaybe<BooleanQueryOperatorInput>;
  pathPrefix?: InputMaybe<StringQueryOperatorInput>;
  jsxRuntime?: InputMaybe<StringQueryOperatorInput>;
  trailingSlash?: InputMaybe<StringQueryOperatorInput>;
  graphqlTypegen?: InputMaybe<BooleanQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryallSiteArgs = {
  filter?: InputMaybe<SiteFilterInput>;
  sort?: InputMaybe<Array<InputMaybe<SiteSortInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QuerysiteFunctionArgs = {
  functionRoute?: InputMaybe<StringQueryOperatorInput>;
  pluginName?: InputMaybe<StringQueryOperatorInput>;
  originalAbsoluteFilePath?: InputMaybe<StringQueryOperatorInput>;
  originalRelativeFilePath?: InputMaybe<StringQueryOperatorInput>;
  relativeCompiledFilePath?: InputMaybe<StringQueryOperatorInput>;
  absoluteCompiledFilePath?: InputMaybe<StringQueryOperatorInput>;
  matchPath?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryallSiteFunctionArgs = {
  filter?: InputMaybe<SiteFunctionFilterInput>;
  sort?: InputMaybe<Array<InputMaybe<SiteFunctionSortInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QuerysitePageArgs = {
  path?: InputMaybe<StringQueryOperatorInput>;
  component?: InputMaybe<StringQueryOperatorInput>;
  internalComponentName?: InputMaybe<StringQueryOperatorInput>;
  componentChunkName?: InputMaybe<StringQueryOperatorInput>;
  matchPath?: InputMaybe<StringQueryOperatorInput>;
  pageContext?: InputMaybe<JSONQueryOperatorInput>;
  pluginCreator?: InputMaybe<SitePluginFilterInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryallSitePageArgs = {
  filter?: InputMaybe<SitePageFilterInput>;
  sort?: InputMaybe<Array<InputMaybe<SitePageSortInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QuerysitePluginArgs = {
  resolve?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  version?: InputMaybe<StringQueryOperatorInput>;
  nodeAPIs?: InputMaybe<StringQueryOperatorInput>;
  browserAPIs?: InputMaybe<StringQueryOperatorInput>;
  ssrAPIs?: InputMaybe<StringQueryOperatorInput>;
  pluginFilepath?: InputMaybe<StringQueryOperatorInput>;
  pluginOptions?: InputMaybe<JSONQueryOperatorInput>;
  packageJson?: InputMaybe<JSONQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryallSitePluginArgs = {
  filter?: InputMaybe<SitePluginFilterInput>;
  sort?: InputMaybe<Array<InputMaybe<SitePluginSortInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QuerysiteBuildMetadataArgs = {
  buildTime?: InputMaybe<DateQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryallSiteBuildMetadataArgs = {
  filter?: InputMaybe<SiteBuildMetadataFilterInput>;
  sort?: InputMaybe<Array<InputMaybe<SiteBuildMetadataSortInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QuerylocalSearchCatalogueArgs = {
  name?: InputMaybe<StringQueryOperatorInput>;
  engine?: InputMaybe<StringQueryOperatorInput>;
  index?: InputMaybe<StringQueryOperatorInput>;
  store?: InputMaybe<JSONQueryOperatorInput>;
  publicIndexURL?: InputMaybe<StringQueryOperatorInput>;
  publicStoreURL?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryallLocalSearchCatalogueArgs = {
  filter?: InputMaybe<LocalSearchCatalogueFilterInput>;
  sort?: InputMaybe<Array<InputMaybe<LocalSearchCatalogueSortInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QuerypreviewsItemArgs = {
  isMature?: InputMaybe<BooleanQueryOperatorInput>;
  isOfferedAgain?: InputMaybe<BooleanQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryallPreviewsItemArgs = {
  filter?: InputMaybe<PreviewsItemFilterInput>;
  sort?: InputMaybe<Array<InputMaybe<PreviewsItemSortInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryaceItemArgs = {
  previewsCode?: InputMaybe<StringQueryOperatorInput>;
  price?: InputMaybe<FloatQueryOperatorInput>;
  publisher?: InputMaybe<StringQueryOperatorInput>;
  slug?: InputMaybe<StringQueryOperatorInput>;
  title?: InputMaybe<StringQueryOperatorInput>;
  catalogueId?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryallAceItemArgs = {
  filter?: InputMaybe<AceItemFilterInput>;
  sort?: InputMaybe<Array<InputMaybe<AceItemSortInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QuerylunarItemArgs = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  coverThumbnail?: InputMaybe<StringQueryOperatorInput>;
  title?: InputMaybe<StringQueryOperatorInput>;
  creators?: InputMaybe<StringQueryOperatorInput>;
  description?: InputMaybe<StringQueryOperatorInput>;
  isMature?: InputMaybe<BooleanQueryOperatorInput>;
};


export type QueryallLunarItemArgs = {
  filter?: InputMaybe<LunarItemFilterInput>;
  sort?: InputMaybe<Array<InputMaybe<LunarItemSortInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};

export type StringQueryOperatorInput = {
  eq?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  regex?: InputMaybe<Scalars['String']>;
  glob?: InputMaybe<Scalars['String']>;
};

export type IntQueryOperatorInput = {
  eq?: InputMaybe<Scalars['Int']>;
  ne?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type DateQueryOperatorInput = {
  eq?: InputMaybe<Scalars['Date']>;
  ne?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
};

export type FloatQueryOperatorInput = {
  eq?: InputMaybe<Scalars['Float']>;
  ne?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
};

export type AceItemFilterListInput = {
  elemMatch?: InputMaybe<AceItemFilterInput>;
};

export type AceItemFilterInput = {
  previewsCode?: InputMaybe<StringQueryOperatorInput>;
  price?: InputMaybe<FloatQueryOperatorInput>;
  publisher?: InputMaybe<StringQueryOperatorInput>;
  slug?: InputMaybe<StringQueryOperatorInput>;
  title?: InputMaybe<StringQueryOperatorInput>;
  catalogueId?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type NodeFilterInput = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type NodeFilterListInput = {
  elemMatch?: InputMaybe<NodeFilterInput>;
};

export type InternalFilterInput = {
  content?: InputMaybe<StringQueryOperatorInput>;
  contentDigest?: InputMaybe<StringQueryOperatorInput>;
  description?: InputMaybe<StringQueryOperatorInput>;
  fieldOwners?: InputMaybe<StringQueryOperatorInput>;
  ignoreType?: InputMaybe<BooleanQueryOperatorInput>;
  mediaType?: InputMaybe<StringQueryOperatorInput>;
  owner?: InputMaybe<StringQueryOperatorInput>;
  type?: InputMaybe<StringQueryOperatorInput>;
  contentFilePath?: InputMaybe<StringQueryOperatorInput>;
};

export type BooleanQueryOperatorInput = {
  eq?: InputMaybe<Scalars['Boolean']>;
  ne?: InputMaybe<Scalars['Boolean']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
};

export type FileConnection = {
  totalCount: Scalars['Int'];
  edges: Array<FileEdge>;
  nodes: Array<File>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<FileGroupConnection>;
};


export type FileConnectiondistinctArgs = {
  field: FileFieldSelector;
};


export type FileConnectionmaxArgs = {
  field: FileFieldSelector;
};


export type FileConnectionminArgs = {
  field: FileFieldSelector;
};


export type FileConnectionsumArgs = {
  field: FileFieldSelector;
};


export type FileConnectiongroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: FileFieldSelector;
};

export type FileEdge = {
  next?: Maybe<File>;
  node: File;
  previous?: Maybe<File>;
};

export type PageInfo = {
  currentPage: Scalars['Int'];
  hasPreviousPage: Scalars['Boolean'];
  hasNextPage: Scalars['Boolean'];
  itemCount: Scalars['Int'];
  pageCount: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type FileFieldSelector = {
  sourceInstanceName?: InputMaybe<FieldSelectorEnum>;
  absolutePath?: InputMaybe<FieldSelectorEnum>;
  relativePath?: InputMaybe<FieldSelectorEnum>;
  extension?: InputMaybe<FieldSelectorEnum>;
  size?: InputMaybe<FieldSelectorEnum>;
  prettySize?: InputMaybe<FieldSelectorEnum>;
  modifiedTime?: InputMaybe<FieldSelectorEnum>;
  accessTime?: InputMaybe<FieldSelectorEnum>;
  changeTime?: InputMaybe<FieldSelectorEnum>;
  birthTime?: InputMaybe<FieldSelectorEnum>;
  root?: InputMaybe<FieldSelectorEnum>;
  dir?: InputMaybe<FieldSelectorEnum>;
  base?: InputMaybe<FieldSelectorEnum>;
  ext?: InputMaybe<FieldSelectorEnum>;
  name?: InputMaybe<FieldSelectorEnum>;
  relativeDirectory?: InputMaybe<FieldSelectorEnum>;
  dev?: InputMaybe<FieldSelectorEnum>;
  mode?: InputMaybe<FieldSelectorEnum>;
  nlink?: InputMaybe<FieldSelectorEnum>;
  uid?: InputMaybe<FieldSelectorEnum>;
  gid?: InputMaybe<FieldSelectorEnum>;
  rdev?: InputMaybe<FieldSelectorEnum>;
  ino?: InputMaybe<FieldSelectorEnum>;
  atimeMs?: InputMaybe<FieldSelectorEnum>;
  mtimeMs?: InputMaybe<FieldSelectorEnum>;
  ctimeMs?: InputMaybe<FieldSelectorEnum>;
  atime?: InputMaybe<FieldSelectorEnum>;
  mtime?: InputMaybe<FieldSelectorEnum>;
  ctime?: InputMaybe<FieldSelectorEnum>;
  birthtime?: InputMaybe<FieldSelectorEnum>;
  birthtimeMs?: InputMaybe<FieldSelectorEnum>;
  blksize?: InputMaybe<FieldSelectorEnum>;
  blocks?: InputMaybe<FieldSelectorEnum>;
  publicURL?: InputMaybe<FieldSelectorEnum>;
  childrenAceItem?: InputMaybe<AceItemFieldSelector>;
  childAceItem?: InputMaybe<AceItemFieldSelector>;
  id?: InputMaybe<FieldSelectorEnum>;
  parent?: InputMaybe<NodeFieldSelector>;
  children?: InputMaybe<NodeFieldSelector>;
  internal?: InputMaybe<InternalFieldSelector>;
};

export type FieldSelectorEnum =
  | 'SELECT';

export type AceItemFieldSelector = {
  previewsCode?: InputMaybe<FieldSelectorEnum>;
  price?: InputMaybe<FieldSelectorEnum>;
  publisher?: InputMaybe<FieldSelectorEnum>;
  slug?: InputMaybe<FieldSelectorEnum>;
  title?: InputMaybe<FieldSelectorEnum>;
  catalogueId?: InputMaybe<FieldSelectorEnum>;
  id?: InputMaybe<FieldSelectorEnum>;
  parent?: InputMaybe<NodeFieldSelector>;
  children?: InputMaybe<NodeFieldSelector>;
  internal?: InputMaybe<InternalFieldSelector>;
};

export type NodeFieldSelector = {
  id?: InputMaybe<FieldSelectorEnum>;
  parent?: InputMaybe<NodeFieldSelector>;
  children?: InputMaybe<NodeFieldSelector>;
  internal?: InputMaybe<InternalFieldSelector>;
};

export type InternalFieldSelector = {
  content?: InputMaybe<FieldSelectorEnum>;
  contentDigest?: InputMaybe<FieldSelectorEnum>;
  description?: InputMaybe<FieldSelectorEnum>;
  fieldOwners?: InputMaybe<FieldSelectorEnum>;
  ignoreType?: InputMaybe<FieldSelectorEnum>;
  mediaType?: InputMaybe<FieldSelectorEnum>;
  owner?: InputMaybe<FieldSelectorEnum>;
  type?: InputMaybe<FieldSelectorEnum>;
  contentFilePath?: InputMaybe<FieldSelectorEnum>;
};

export type FileGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<FileEdge>;
  nodes: Array<File>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<FileGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type FileGroupConnectiondistinctArgs = {
  field: FileFieldSelector;
};


export type FileGroupConnectionmaxArgs = {
  field: FileFieldSelector;
};


export type FileGroupConnectionminArgs = {
  field: FileFieldSelector;
};


export type FileGroupConnectionsumArgs = {
  field: FileFieldSelector;
};


export type FileGroupConnectiongroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: FileFieldSelector;
};

export type FileFilterInput = {
  sourceInstanceName?: InputMaybe<StringQueryOperatorInput>;
  absolutePath?: InputMaybe<StringQueryOperatorInput>;
  relativePath?: InputMaybe<StringQueryOperatorInput>;
  extension?: InputMaybe<StringQueryOperatorInput>;
  size?: InputMaybe<IntQueryOperatorInput>;
  prettySize?: InputMaybe<StringQueryOperatorInput>;
  modifiedTime?: InputMaybe<DateQueryOperatorInput>;
  accessTime?: InputMaybe<DateQueryOperatorInput>;
  changeTime?: InputMaybe<DateQueryOperatorInput>;
  birthTime?: InputMaybe<DateQueryOperatorInput>;
  root?: InputMaybe<StringQueryOperatorInput>;
  dir?: InputMaybe<StringQueryOperatorInput>;
  base?: InputMaybe<StringQueryOperatorInput>;
  ext?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  relativeDirectory?: InputMaybe<StringQueryOperatorInput>;
  dev?: InputMaybe<IntQueryOperatorInput>;
  mode?: InputMaybe<IntQueryOperatorInput>;
  nlink?: InputMaybe<IntQueryOperatorInput>;
  uid?: InputMaybe<IntQueryOperatorInput>;
  gid?: InputMaybe<IntQueryOperatorInput>;
  rdev?: InputMaybe<IntQueryOperatorInput>;
  ino?: InputMaybe<FloatQueryOperatorInput>;
  atimeMs?: InputMaybe<FloatQueryOperatorInput>;
  mtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  ctimeMs?: InputMaybe<FloatQueryOperatorInput>;
  atime?: InputMaybe<DateQueryOperatorInput>;
  mtime?: InputMaybe<DateQueryOperatorInput>;
  ctime?: InputMaybe<DateQueryOperatorInput>;
  birthtime?: InputMaybe<DateQueryOperatorInput>;
  birthtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  blksize?: InputMaybe<IntQueryOperatorInput>;
  blocks?: InputMaybe<IntQueryOperatorInput>;
  publicURL?: InputMaybe<StringQueryOperatorInput>;
  childrenAceItem?: InputMaybe<AceItemFilterListInput>;
  childAceItem?: InputMaybe<AceItemFilterInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type FileSortInput = {
  sourceInstanceName?: InputMaybe<SortOrderEnum>;
  absolutePath?: InputMaybe<SortOrderEnum>;
  relativePath?: InputMaybe<SortOrderEnum>;
  extension?: InputMaybe<SortOrderEnum>;
  size?: InputMaybe<SortOrderEnum>;
  prettySize?: InputMaybe<SortOrderEnum>;
  modifiedTime?: InputMaybe<SortOrderEnum>;
  accessTime?: InputMaybe<SortOrderEnum>;
  changeTime?: InputMaybe<SortOrderEnum>;
  birthTime?: InputMaybe<SortOrderEnum>;
  root?: InputMaybe<SortOrderEnum>;
  dir?: InputMaybe<SortOrderEnum>;
  base?: InputMaybe<SortOrderEnum>;
  ext?: InputMaybe<SortOrderEnum>;
  name?: InputMaybe<SortOrderEnum>;
  relativeDirectory?: InputMaybe<SortOrderEnum>;
  dev?: InputMaybe<SortOrderEnum>;
  mode?: InputMaybe<SortOrderEnum>;
  nlink?: InputMaybe<SortOrderEnum>;
  uid?: InputMaybe<SortOrderEnum>;
  gid?: InputMaybe<SortOrderEnum>;
  rdev?: InputMaybe<SortOrderEnum>;
  ino?: InputMaybe<SortOrderEnum>;
  atimeMs?: InputMaybe<SortOrderEnum>;
  mtimeMs?: InputMaybe<SortOrderEnum>;
  ctimeMs?: InputMaybe<SortOrderEnum>;
  atime?: InputMaybe<SortOrderEnum>;
  mtime?: InputMaybe<SortOrderEnum>;
  ctime?: InputMaybe<SortOrderEnum>;
  birthtime?: InputMaybe<SortOrderEnum>;
  birthtimeMs?: InputMaybe<SortOrderEnum>;
  blksize?: InputMaybe<SortOrderEnum>;
  blocks?: InputMaybe<SortOrderEnum>;
  publicURL?: InputMaybe<SortOrderEnum>;
  childrenAceItem?: InputMaybe<AceItemSortInput>;
  childAceItem?: InputMaybe<AceItemSortInput>;
  id?: InputMaybe<SortOrderEnum>;
  parent?: InputMaybe<NodeSortInput>;
  children?: InputMaybe<NodeSortInput>;
  internal?: InputMaybe<InternalSortInput>;
};

export type SortOrderEnum =
  | 'ASC'
  | 'DESC';

export type AceItemSortInput = {
  previewsCode?: InputMaybe<SortOrderEnum>;
  price?: InputMaybe<SortOrderEnum>;
  publisher?: InputMaybe<SortOrderEnum>;
  slug?: InputMaybe<SortOrderEnum>;
  title?: InputMaybe<SortOrderEnum>;
  catalogueId?: InputMaybe<SortOrderEnum>;
  id?: InputMaybe<SortOrderEnum>;
  parent?: InputMaybe<NodeSortInput>;
  children?: InputMaybe<NodeSortInput>;
  internal?: InputMaybe<InternalSortInput>;
};

export type NodeSortInput = {
  id?: InputMaybe<SortOrderEnum>;
  parent?: InputMaybe<NodeSortInput>;
  children?: InputMaybe<NodeSortInput>;
  internal?: InputMaybe<InternalSortInput>;
};

export type InternalSortInput = {
  content?: InputMaybe<SortOrderEnum>;
  contentDigest?: InputMaybe<SortOrderEnum>;
  description?: InputMaybe<SortOrderEnum>;
  fieldOwners?: InputMaybe<SortOrderEnum>;
  ignoreType?: InputMaybe<SortOrderEnum>;
  mediaType?: InputMaybe<SortOrderEnum>;
  owner?: InputMaybe<SortOrderEnum>;
  type?: InputMaybe<SortOrderEnum>;
  contentFilePath?: InputMaybe<SortOrderEnum>;
};

export type DirectoryConnection = {
  totalCount: Scalars['Int'];
  edges: Array<DirectoryEdge>;
  nodes: Array<Directory>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<DirectoryGroupConnection>;
};


export type DirectoryConnectiondistinctArgs = {
  field: DirectoryFieldSelector;
};


export type DirectoryConnectionmaxArgs = {
  field: DirectoryFieldSelector;
};


export type DirectoryConnectionminArgs = {
  field: DirectoryFieldSelector;
};


export type DirectoryConnectionsumArgs = {
  field: DirectoryFieldSelector;
};


export type DirectoryConnectiongroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: DirectoryFieldSelector;
};

export type DirectoryEdge = {
  next?: Maybe<Directory>;
  node: Directory;
  previous?: Maybe<Directory>;
};

export type DirectoryFieldSelector = {
  sourceInstanceName?: InputMaybe<FieldSelectorEnum>;
  absolutePath?: InputMaybe<FieldSelectorEnum>;
  relativePath?: InputMaybe<FieldSelectorEnum>;
  extension?: InputMaybe<FieldSelectorEnum>;
  size?: InputMaybe<FieldSelectorEnum>;
  prettySize?: InputMaybe<FieldSelectorEnum>;
  modifiedTime?: InputMaybe<FieldSelectorEnum>;
  accessTime?: InputMaybe<FieldSelectorEnum>;
  changeTime?: InputMaybe<FieldSelectorEnum>;
  birthTime?: InputMaybe<FieldSelectorEnum>;
  root?: InputMaybe<FieldSelectorEnum>;
  dir?: InputMaybe<FieldSelectorEnum>;
  base?: InputMaybe<FieldSelectorEnum>;
  ext?: InputMaybe<FieldSelectorEnum>;
  name?: InputMaybe<FieldSelectorEnum>;
  relativeDirectory?: InputMaybe<FieldSelectorEnum>;
  dev?: InputMaybe<FieldSelectorEnum>;
  mode?: InputMaybe<FieldSelectorEnum>;
  nlink?: InputMaybe<FieldSelectorEnum>;
  uid?: InputMaybe<FieldSelectorEnum>;
  gid?: InputMaybe<FieldSelectorEnum>;
  rdev?: InputMaybe<FieldSelectorEnum>;
  ino?: InputMaybe<FieldSelectorEnum>;
  atimeMs?: InputMaybe<FieldSelectorEnum>;
  mtimeMs?: InputMaybe<FieldSelectorEnum>;
  ctimeMs?: InputMaybe<FieldSelectorEnum>;
  atime?: InputMaybe<FieldSelectorEnum>;
  mtime?: InputMaybe<FieldSelectorEnum>;
  ctime?: InputMaybe<FieldSelectorEnum>;
  birthtime?: InputMaybe<FieldSelectorEnum>;
  birthtimeMs?: InputMaybe<FieldSelectorEnum>;
  id?: InputMaybe<FieldSelectorEnum>;
  parent?: InputMaybe<NodeFieldSelector>;
  children?: InputMaybe<NodeFieldSelector>;
  internal?: InputMaybe<InternalFieldSelector>;
};

export type DirectoryGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<DirectoryEdge>;
  nodes: Array<Directory>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<DirectoryGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type DirectoryGroupConnectiondistinctArgs = {
  field: DirectoryFieldSelector;
};


export type DirectoryGroupConnectionmaxArgs = {
  field: DirectoryFieldSelector;
};


export type DirectoryGroupConnectionminArgs = {
  field: DirectoryFieldSelector;
};


export type DirectoryGroupConnectionsumArgs = {
  field: DirectoryFieldSelector;
};


export type DirectoryGroupConnectiongroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: DirectoryFieldSelector;
};

export type DirectoryFilterInput = {
  sourceInstanceName?: InputMaybe<StringQueryOperatorInput>;
  absolutePath?: InputMaybe<StringQueryOperatorInput>;
  relativePath?: InputMaybe<StringQueryOperatorInput>;
  extension?: InputMaybe<StringQueryOperatorInput>;
  size?: InputMaybe<IntQueryOperatorInput>;
  prettySize?: InputMaybe<StringQueryOperatorInput>;
  modifiedTime?: InputMaybe<DateQueryOperatorInput>;
  accessTime?: InputMaybe<DateQueryOperatorInput>;
  changeTime?: InputMaybe<DateQueryOperatorInput>;
  birthTime?: InputMaybe<DateQueryOperatorInput>;
  root?: InputMaybe<StringQueryOperatorInput>;
  dir?: InputMaybe<StringQueryOperatorInput>;
  base?: InputMaybe<StringQueryOperatorInput>;
  ext?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  relativeDirectory?: InputMaybe<StringQueryOperatorInput>;
  dev?: InputMaybe<IntQueryOperatorInput>;
  mode?: InputMaybe<IntQueryOperatorInput>;
  nlink?: InputMaybe<IntQueryOperatorInput>;
  uid?: InputMaybe<IntQueryOperatorInput>;
  gid?: InputMaybe<IntQueryOperatorInput>;
  rdev?: InputMaybe<IntQueryOperatorInput>;
  ino?: InputMaybe<FloatQueryOperatorInput>;
  atimeMs?: InputMaybe<FloatQueryOperatorInput>;
  mtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  ctimeMs?: InputMaybe<FloatQueryOperatorInput>;
  atime?: InputMaybe<DateQueryOperatorInput>;
  mtime?: InputMaybe<DateQueryOperatorInput>;
  ctime?: InputMaybe<DateQueryOperatorInput>;
  birthtime?: InputMaybe<DateQueryOperatorInput>;
  birthtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type DirectorySortInput = {
  sourceInstanceName?: InputMaybe<SortOrderEnum>;
  absolutePath?: InputMaybe<SortOrderEnum>;
  relativePath?: InputMaybe<SortOrderEnum>;
  extension?: InputMaybe<SortOrderEnum>;
  size?: InputMaybe<SortOrderEnum>;
  prettySize?: InputMaybe<SortOrderEnum>;
  modifiedTime?: InputMaybe<SortOrderEnum>;
  accessTime?: InputMaybe<SortOrderEnum>;
  changeTime?: InputMaybe<SortOrderEnum>;
  birthTime?: InputMaybe<SortOrderEnum>;
  root?: InputMaybe<SortOrderEnum>;
  dir?: InputMaybe<SortOrderEnum>;
  base?: InputMaybe<SortOrderEnum>;
  ext?: InputMaybe<SortOrderEnum>;
  name?: InputMaybe<SortOrderEnum>;
  relativeDirectory?: InputMaybe<SortOrderEnum>;
  dev?: InputMaybe<SortOrderEnum>;
  mode?: InputMaybe<SortOrderEnum>;
  nlink?: InputMaybe<SortOrderEnum>;
  uid?: InputMaybe<SortOrderEnum>;
  gid?: InputMaybe<SortOrderEnum>;
  rdev?: InputMaybe<SortOrderEnum>;
  ino?: InputMaybe<SortOrderEnum>;
  atimeMs?: InputMaybe<SortOrderEnum>;
  mtimeMs?: InputMaybe<SortOrderEnum>;
  ctimeMs?: InputMaybe<SortOrderEnum>;
  atime?: InputMaybe<SortOrderEnum>;
  mtime?: InputMaybe<SortOrderEnum>;
  ctime?: InputMaybe<SortOrderEnum>;
  birthtime?: InputMaybe<SortOrderEnum>;
  birthtimeMs?: InputMaybe<SortOrderEnum>;
  id?: InputMaybe<SortOrderEnum>;
  parent?: InputMaybe<NodeSortInput>;
  children?: InputMaybe<NodeSortInput>;
  internal?: InputMaybe<InternalSortInput>;
};

export type SiteSiteMetadataFilterInput = {
  title?: InputMaybe<StringQueryOperatorInput>;
  description?: InputMaybe<StringQueryOperatorInput>;
  url?: InputMaybe<StringQueryOperatorInput>;
  twitterUsername?: InputMaybe<StringQueryOperatorInput>;
  titleTemplate?: InputMaybe<StringQueryOperatorInput>;
};

export type SiteConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteEdge>;
  nodes: Array<Site>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SiteGroupConnection>;
};


export type SiteConnectiondistinctArgs = {
  field: SiteFieldSelector;
};


export type SiteConnectionmaxArgs = {
  field: SiteFieldSelector;
};


export type SiteConnectionminArgs = {
  field: SiteFieldSelector;
};


export type SiteConnectionsumArgs = {
  field: SiteFieldSelector;
};


export type SiteConnectiongroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SiteFieldSelector;
};

export type SiteEdge = {
  next?: Maybe<Site>;
  node: Site;
  previous?: Maybe<Site>;
};

export type SiteFieldSelector = {
  buildTime?: InputMaybe<FieldSelectorEnum>;
  siteMetadata?: InputMaybe<SiteSiteMetadataFieldSelector>;
  port?: InputMaybe<FieldSelectorEnum>;
  host?: InputMaybe<FieldSelectorEnum>;
  polyfill?: InputMaybe<FieldSelectorEnum>;
  pathPrefix?: InputMaybe<FieldSelectorEnum>;
  jsxRuntime?: InputMaybe<FieldSelectorEnum>;
  trailingSlash?: InputMaybe<FieldSelectorEnum>;
  graphqlTypegen?: InputMaybe<FieldSelectorEnum>;
  id?: InputMaybe<FieldSelectorEnum>;
  parent?: InputMaybe<NodeFieldSelector>;
  children?: InputMaybe<NodeFieldSelector>;
  internal?: InputMaybe<InternalFieldSelector>;
};

export type SiteSiteMetadataFieldSelector = {
  title?: InputMaybe<FieldSelectorEnum>;
  description?: InputMaybe<FieldSelectorEnum>;
  url?: InputMaybe<FieldSelectorEnum>;
  twitterUsername?: InputMaybe<FieldSelectorEnum>;
  titleTemplate?: InputMaybe<FieldSelectorEnum>;
};

export type SiteGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteEdge>;
  nodes: Array<Site>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SiteGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type SiteGroupConnectiondistinctArgs = {
  field: SiteFieldSelector;
};


export type SiteGroupConnectionmaxArgs = {
  field: SiteFieldSelector;
};


export type SiteGroupConnectionminArgs = {
  field: SiteFieldSelector;
};


export type SiteGroupConnectionsumArgs = {
  field: SiteFieldSelector;
};


export type SiteGroupConnectiongroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SiteFieldSelector;
};

export type SiteFilterInput = {
  buildTime?: InputMaybe<DateQueryOperatorInput>;
  siteMetadata?: InputMaybe<SiteSiteMetadataFilterInput>;
  port?: InputMaybe<IntQueryOperatorInput>;
  host?: InputMaybe<StringQueryOperatorInput>;
  polyfill?: InputMaybe<BooleanQueryOperatorInput>;
  pathPrefix?: InputMaybe<StringQueryOperatorInput>;
  jsxRuntime?: InputMaybe<StringQueryOperatorInput>;
  trailingSlash?: InputMaybe<StringQueryOperatorInput>;
  graphqlTypegen?: InputMaybe<BooleanQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type SiteSortInput = {
  buildTime?: InputMaybe<SortOrderEnum>;
  siteMetadata?: InputMaybe<SiteSiteMetadataSortInput>;
  port?: InputMaybe<SortOrderEnum>;
  host?: InputMaybe<SortOrderEnum>;
  polyfill?: InputMaybe<SortOrderEnum>;
  pathPrefix?: InputMaybe<SortOrderEnum>;
  jsxRuntime?: InputMaybe<SortOrderEnum>;
  trailingSlash?: InputMaybe<SortOrderEnum>;
  graphqlTypegen?: InputMaybe<SortOrderEnum>;
  id?: InputMaybe<SortOrderEnum>;
  parent?: InputMaybe<NodeSortInput>;
  children?: InputMaybe<NodeSortInput>;
  internal?: InputMaybe<InternalSortInput>;
};

export type SiteSiteMetadataSortInput = {
  title?: InputMaybe<SortOrderEnum>;
  description?: InputMaybe<SortOrderEnum>;
  url?: InputMaybe<SortOrderEnum>;
  twitterUsername?: InputMaybe<SortOrderEnum>;
  titleTemplate?: InputMaybe<SortOrderEnum>;
};

export type SiteFunctionConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteFunctionEdge>;
  nodes: Array<SiteFunction>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SiteFunctionGroupConnection>;
};


export type SiteFunctionConnectiondistinctArgs = {
  field: SiteFunctionFieldSelector;
};


export type SiteFunctionConnectionmaxArgs = {
  field: SiteFunctionFieldSelector;
};


export type SiteFunctionConnectionminArgs = {
  field: SiteFunctionFieldSelector;
};


export type SiteFunctionConnectionsumArgs = {
  field: SiteFunctionFieldSelector;
};


export type SiteFunctionConnectiongroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SiteFunctionFieldSelector;
};

export type SiteFunctionEdge = {
  next?: Maybe<SiteFunction>;
  node: SiteFunction;
  previous?: Maybe<SiteFunction>;
};

export type SiteFunctionFieldSelector = {
  functionRoute?: InputMaybe<FieldSelectorEnum>;
  pluginName?: InputMaybe<FieldSelectorEnum>;
  originalAbsoluteFilePath?: InputMaybe<FieldSelectorEnum>;
  originalRelativeFilePath?: InputMaybe<FieldSelectorEnum>;
  relativeCompiledFilePath?: InputMaybe<FieldSelectorEnum>;
  absoluteCompiledFilePath?: InputMaybe<FieldSelectorEnum>;
  matchPath?: InputMaybe<FieldSelectorEnum>;
  id?: InputMaybe<FieldSelectorEnum>;
  parent?: InputMaybe<NodeFieldSelector>;
  children?: InputMaybe<NodeFieldSelector>;
  internal?: InputMaybe<InternalFieldSelector>;
};

export type SiteFunctionGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteFunctionEdge>;
  nodes: Array<SiteFunction>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SiteFunctionGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type SiteFunctionGroupConnectiondistinctArgs = {
  field: SiteFunctionFieldSelector;
};


export type SiteFunctionGroupConnectionmaxArgs = {
  field: SiteFunctionFieldSelector;
};


export type SiteFunctionGroupConnectionminArgs = {
  field: SiteFunctionFieldSelector;
};


export type SiteFunctionGroupConnectionsumArgs = {
  field: SiteFunctionFieldSelector;
};


export type SiteFunctionGroupConnectiongroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SiteFunctionFieldSelector;
};

export type SiteFunctionFilterInput = {
  functionRoute?: InputMaybe<StringQueryOperatorInput>;
  pluginName?: InputMaybe<StringQueryOperatorInput>;
  originalAbsoluteFilePath?: InputMaybe<StringQueryOperatorInput>;
  originalRelativeFilePath?: InputMaybe<StringQueryOperatorInput>;
  relativeCompiledFilePath?: InputMaybe<StringQueryOperatorInput>;
  absoluteCompiledFilePath?: InputMaybe<StringQueryOperatorInput>;
  matchPath?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type SiteFunctionSortInput = {
  functionRoute?: InputMaybe<SortOrderEnum>;
  pluginName?: InputMaybe<SortOrderEnum>;
  originalAbsoluteFilePath?: InputMaybe<SortOrderEnum>;
  originalRelativeFilePath?: InputMaybe<SortOrderEnum>;
  relativeCompiledFilePath?: InputMaybe<SortOrderEnum>;
  absoluteCompiledFilePath?: InputMaybe<SortOrderEnum>;
  matchPath?: InputMaybe<SortOrderEnum>;
  id?: InputMaybe<SortOrderEnum>;
  parent?: InputMaybe<NodeSortInput>;
  children?: InputMaybe<NodeSortInput>;
  internal?: InputMaybe<InternalSortInput>;
};

export type JSONQueryOperatorInput = {
  eq?: InputMaybe<Scalars['JSON']>;
  ne?: InputMaybe<Scalars['JSON']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  regex?: InputMaybe<Scalars['JSON']>;
  glob?: InputMaybe<Scalars['JSON']>;
};

export type SitePluginFilterInput = {
  resolve?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  version?: InputMaybe<StringQueryOperatorInput>;
  nodeAPIs?: InputMaybe<StringQueryOperatorInput>;
  browserAPIs?: InputMaybe<StringQueryOperatorInput>;
  ssrAPIs?: InputMaybe<StringQueryOperatorInput>;
  pluginFilepath?: InputMaybe<StringQueryOperatorInput>;
  pluginOptions?: InputMaybe<JSONQueryOperatorInput>;
  packageJson?: InputMaybe<JSONQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type SitePageConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SitePageEdge>;
  nodes: Array<SitePage>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SitePageGroupConnection>;
};


export type SitePageConnectiondistinctArgs = {
  field: SitePageFieldSelector;
};


export type SitePageConnectionmaxArgs = {
  field: SitePageFieldSelector;
};


export type SitePageConnectionminArgs = {
  field: SitePageFieldSelector;
};


export type SitePageConnectionsumArgs = {
  field: SitePageFieldSelector;
};


export type SitePageConnectiongroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SitePageFieldSelector;
};

export type SitePageEdge = {
  next?: Maybe<SitePage>;
  node: SitePage;
  previous?: Maybe<SitePage>;
};

export type SitePageFieldSelector = {
  path?: InputMaybe<FieldSelectorEnum>;
  component?: InputMaybe<FieldSelectorEnum>;
  internalComponentName?: InputMaybe<FieldSelectorEnum>;
  componentChunkName?: InputMaybe<FieldSelectorEnum>;
  matchPath?: InputMaybe<FieldSelectorEnum>;
  pageContext?: InputMaybe<FieldSelectorEnum>;
  pluginCreator?: InputMaybe<SitePluginFieldSelector>;
  id?: InputMaybe<FieldSelectorEnum>;
  parent?: InputMaybe<NodeFieldSelector>;
  children?: InputMaybe<NodeFieldSelector>;
  internal?: InputMaybe<InternalFieldSelector>;
};

export type SitePluginFieldSelector = {
  resolve?: InputMaybe<FieldSelectorEnum>;
  name?: InputMaybe<FieldSelectorEnum>;
  version?: InputMaybe<FieldSelectorEnum>;
  nodeAPIs?: InputMaybe<FieldSelectorEnum>;
  browserAPIs?: InputMaybe<FieldSelectorEnum>;
  ssrAPIs?: InputMaybe<FieldSelectorEnum>;
  pluginFilepath?: InputMaybe<FieldSelectorEnum>;
  pluginOptions?: InputMaybe<FieldSelectorEnum>;
  packageJson?: InputMaybe<FieldSelectorEnum>;
  id?: InputMaybe<FieldSelectorEnum>;
  parent?: InputMaybe<NodeFieldSelector>;
  children?: InputMaybe<NodeFieldSelector>;
  internal?: InputMaybe<InternalFieldSelector>;
};

export type SitePageGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SitePageEdge>;
  nodes: Array<SitePage>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SitePageGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type SitePageGroupConnectiondistinctArgs = {
  field: SitePageFieldSelector;
};


export type SitePageGroupConnectionmaxArgs = {
  field: SitePageFieldSelector;
};


export type SitePageGroupConnectionminArgs = {
  field: SitePageFieldSelector;
};


export type SitePageGroupConnectionsumArgs = {
  field: SitePageFieldSelector;
};


export type SitePageGroupConnectiongroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SitePageFieldSelector;
};

export type SitePageFilterInput = {
  path?: InputMaybe<StringQueryOperatorInput>;
  component?: InputMaybe<StringQueryOperatorInput>;
  internalComponentName?: InputMaybe<StringQueryOperatorInput>;
  componentChunkName?: InputMaybe<StringQueryOperatorInput>;
  matchPath?: InputMaybe<StringQueryOperatorInput>;
  pageContext?: InputMaybe<JSONQueryOperatorInput>;
  pluginCreator?: InputMaybe<SitePluginFilterInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type SitePageSortInput = {
  path?: InputMaybe<SortOrderEnum>;
  component?: InputMaybe<SortOrderEnum>;
  internalComponentName?: InputMaybe<SortOrderEnum>;
  componentChunkName?: InputMaybe<SortOrderEnum>;
  matchPath?: InputMaybe<SortOrderEnum>;
  pageContext?: InputMaybe<SortOrderEnum>;
  pluginCreator?: InputMaybe<SitePluginSortInput>;
  id?: InputMaybe<SortOrderEnum>;
  parent?: InputMaybe<NodeSortInput>;
  children?: InputMaybe<NodeSortInput>;
  internal?: InputMaybe<InternalSortInput>;
};

export type SitePluginSortInput = {
  resolve?: InputMaybe<SortOrderEnum>;
  name?: InputMaybe<SortOrderEnum>;
  version?: InputMaybe<SortOrderEnum>;
  nodeAPIs?: InputMaybe<SortOrderEnum>;
  browserAPIs?: InputMaybe<SortOrderEnum>;
  ssrAPIs?: InputMaybe<SortOrderEnum>;
  pluginFilepath?: InputMaybe<SortOrderEnum>;
  pluginOptions?: InputMaybe<SortOrderEnum>;
  packageJson?: InputMaybe<SortOrderEnum>;
  id?: InputMaybe<SortOrderEnum>;
  parent?: InputMaybe<NodeSortInput>;
  children?: InputMaybe<NodeSortInput>;
  internal?: InputMaybe<InternalSortInput>;
};

export type SitePluginConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SitePluginEdge>;
  nodes: Array<SitePlugin>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SitePluginGroupConnection>;
};


export type SitePluginConnectiondistinctArgs = {
  field: SitePluginFieldSelector;
};


export type SitePluginConnectionmaxArgs = {
  field: SitePluginFieldSelector;
};


export type SitePluginConnectionminArgs = {
  field: SitePluginFieldSelector;
};


export type SitePluginConnectionsumArgs = {
  field: SitePluginFieldSelector;
};


export type SitePluginConnectiongroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SitePluginFieldSelector;
};

export type SitePluginEdge = {
  next?: Maybe<SitePlugin>;
  node: SitePlugin;
  previous?: Maybe<SitePlugin>;
};

export type SitePluginGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SitePluginEdge>;
  nodes: Array<SitePlugin>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SitePluginGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type SitePluginGroupConnectiondistinctArgs = {
  field: SitePluginFieldSelector;
};


export type SitePluginGroupConnectionmaxArgs = {
  field: SitePluginFieldSelector;
};


export type SitePluginGroupConnectionminArgs = {
  field: SitePluginFieldSelector;
};


export type SitePluginGroupConnectionsumArgs = {
  field: SitePluginFieldSelector;
};


export type SitePluginGroupConnectiongroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SitePluginFieldSelector;
};

export type SiteBuildMetadataConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteBuildMetadataEdge>;
  nodes: Array<SiteBuildMetadata>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SiteBuildMetadataGroupConnection>;
};


export type SiteBuildMetadataConnectiondistinctArgs = {
  field: SiteBuildMetadataFieldSelector;
};


export type SiteBuildMetadataConnectionmaxArgs = {
  field: SiteBuildMetadataFieldSelector;
};


export type SiteBuildMetadataConnectionminArgs = {
  field: SiteBuildMetadataFieldSelector;
};


export type SiteBuildMetadataConnectionsumArgs = {
  field: SiteBuildMetadataFieldSelector;
};


export type SiteBuildMetadataConnectiongroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SiteBuildMetadataFieldSelector;
};

export type SiteBuildMetadataEdge = {
  next?: Maybe<SiteBuildMetadata>;
  node: SiteBuildMetadata;
  previous?: Maybe<SiteBuildMetadata>;
};

export type SiteBuildMetadataFieldSelector = {
  buildTime?: InputMaybe<FieldSelectorEnum>;
  id?: InputMaybe<FieldSelectorEnum>;
  parent?: InputMaybe<NodeFieldSelector>;
  children?: InputMaybe<NodeFieldSelector>;
  internal?: InputMaybe<InternalFieldSelector>;
};

export type SiteBuildMetadataGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteBuildMetadataEdge>;
  nodes: Array<SiteBuildMetadata>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SiteBuildMetadataGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type SiteBuildMetadataGroupConnectiondistinctArgs = {
  field: SiteBuildMetadataFieldSelector;
};


export type SiteBuildMetadataGroupConnectionmaxArgs = {
  field: SiteBuildMetadataFieldSelector;
};


export type SiteBuildMetadataGroupConnectionminArgs = {
  field: SiteBuildMetadataFieldSelector;
};


export type SiteBuildMetadataGroupConnectionsumArgs = {
  field: SiteBuildMetadataFieldSelector;
};


export type SiteBuildMetadataGroupConnectiongroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SiteBuildMetadataFieldSelector;
};

export type SiteBuildMetadataFilterInput = {
  buildTime?: InputMaybe<DateQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type SiteBuildMetadataSortInput = {
  buildTime?: InputMaybe<SortOrderEnum>;
  id?: InputMaybe<SortOrderEnum>;
  parent?: InputMaybe<NodeSortInput>;
  children?: InputMaybe<NodeSortInput>;
  internal?: InputMaybe<InternalSortInput>;
};

export type LocalSearchCatalogueConnection = {
  totalCount: Scalars['Int'];
  edges: Array<LocalSearchCatalogueEdge>;
  nodes: Array<LocalSearchCatalogue>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<LocalSearchCatalogueGroupConnection>;
};


export type LocalSearchCatalogueConnectiondistinctArgs = {
  field: LocalSearchCatalogueFieldSelector;
};


export type LocalSearchCatalogueConnectionmaxArgs = {
  field: LocalSearchCatalogueFieldSelector;
};


export type LocalSearchCatalogueConnectionminArgs = {
  field: LocalSearchCatalogueFieldSelector;
};


export type LocalSearchCatalogueConnectionsumArgs = {
  field: LocalSearchCatalogueFieldSelector;
};


export type LocalSearchCatalogueConnectiongroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: LocalSearchCatalogueFieldSelector;
};

export type LocalSearchCatalogueEdge = {
  next?: Maybe<LocalSearchCatalogue>;
  node: LocalSearchCatalogue;
  previous?: Maybe<LocalSearchCatalogue>;
};

export type LocalSearchCatalogueFieldSelector = {
  name?: InputMaybe<FieldSelectorEnum>;
  engine?: InputMaybe<FieldSelectorEnum>;
  index?: InputMaybe<FieldSelectorEnum>;
  store?: InputMaybe<FieldSelectorEnum>;
  publicIndexURL?: InputMaybe<FieldSelectorEnum>;
  publicStoreURL?: InputMaybe<FieldSelectorEnum>;
  id?: InputMaybe<FieldSelectorEnum>;
  parent?: InputMaybe<NodeFieldSelector>;
  children?: InputMaybe<NodeFieldSelector>;
  internal?: InputMaybe<InternalFieldSelector>;
};

export type LocalSearchCatalogueGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<LocalSearchCatalogueEdge>;
  nodes: Array<LocalSearchCatalogue>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<LocalSearchCatalogueGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type LocalSearchCatalogueGroupConnectiondistinctArgs = {
  field: LocalSearchCatalogueFieldSelector;
};


export type LocalSearchCatalogueGroupConnectionmaxArgs = {
  field: LocalSearchCatalogueFieldSelector;
};


export type LocalSearchCatalogueGroupConnectionminArgs = {
  field: LocalSearchCatalogueFieldSelector;
};


export type LocalSearchCatalogueGroupConnectionsumArgs = {
  field: LocalSearchCatalogueFieldSelector;
};


export type LocalSearchCatalogueGroupConnectiongroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: LocalSearchCatalogueFieldSelector;
};

export type LocalSearchCatalogueFilterInput = {
  name?: InputMaybe<StringQueryOperatorInput>;
  engine?: InputMaybe<StringQueryOperatorInput>;
  index?: InputMaybe<StringQueryOperatorInput>;
  store?: InputMaybe<JSONQueryOperatorInput>;
  publicIndexURL?: InputMaybe<StringQueryOperatorInput>;
  publicStoreURL?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type LocalSearchCatalogueSortInput = {
  name?: InputMaybe<SortOrderEnum>;
  engine?: InputMaybe<SortOrderEnum>;
  index?: InputMaybe<SortOrderEnum>;
  store?: InputMaybe<SortOrderEnum>;
  publicIndexURL?: InputMaybe<SortOrderEnum>;
  publicStoreURL?: InputMaybe<SortOrderEnum>;
  id?: InputMaybe<SortOrderEnum>;
  parent?: InputMaybe<NodeSortInput>;
  children?: InputMaybe<NodeSortInput>;
  internal?: InputMaybe<InternalSortInput>;
};

export type PreviewsItemConnection = {
  totalCount: Scalars['Int'];
  edges: Array<PreviewsItemEdge>;
  nodes: Array<PreviewsItem>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<PreviewsItemGroupConnection>;
};


export type PreviewsItemConnectiondistinctArgs = {
  field: PreviewsItemFieldSelector;
};


export type PreviewsItemConnectionmaxArgs = {
  field: PreviewsItemFieldSelector;
};


export type PreviewsItemConnectionminArgs = {
  field: PreviewsItemFieldSelector;
};


export type PreviewsItemConnectionsumArgs = {
  field: PreviewsItemFieldSelector;
};


export type PreviewsItemConnectiongroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: PreviewsItemFieldSelector;
};

export type PreviewsItemEdge = {
  next?: Maybe<PreviewsItem>;
  node: PreviewsItem;
  previous?: Maybe<PreviewsItem>;
};

export type PreviewsItemFieldSelector = {
  isMature?: InputMaybe<FieldSelectorEnum>;
  isOfferedAgain?: InputMaybe<FieldSelectorEnum>;
  id?: InputMaybe<FieldSelectorEnum>;
  parent?: InputMaybe<NodeFieldSelector>;
  children?: InputMaybe<NodeFieldSelector>;
  internal?: InputMaybe<InternalFieldSelector>;
};

export type PreviewsItemGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<PreviewsItemEdge>;
  nodes: Array<PreviewsItem>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<PreviewsItemGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type PreviewsItemGroupConnectiondistinctArgs = {
  field: PreviewsItemFieldSelector;
};


export type PreviewsItemGroupConnectionmaxArgs = {
  field: PreviewsItemFieldSelector;
};


export type PreviewsItemGroupConnectionminArgs = {
  field: PreviewsItemFieldSelector;
};


export type PreviewsItemGroupConnectionsumArgs = {
  field: PreviewsItemFieldSelector;
};


export type PreviewsItemGroupConnectiongroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: PreviewsItemFieldSelector;
};

export type PreviewsItemFilterInput = {
  isMature?: InputMaybe<BooleanQueryOperatorInput>;
  isOfferedAgain?: InputMaybe<BooleanQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type PreviewsItemSortInput = {
  isMature?: InputMaybe<SortOrderEnum>;
  isOfferedAgain?: InputMaybe<SortOrderEnum>;
  id?: InputMaybe<SortOrderEnum>;
  parent?: InputMaybe<NodeSortInput>;
  children?: InputMaybe<NodeSortInput>;
  internal?: InputMaybe<InternalSortInput>;
};

export type AceItemConnection = {
  totalCount: Scalars['Int'];
  edges: Array<AceItemEdge>;
  nodes: Array<AceItem>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<AceItemGroupConnection>;
};


export type AceItemConnectiondistinctArgs = {
  field: AceItemFieldSelector;
};


export type AceItemConnectionmaxArgs = {
  field: AceItemFieldSelector;
};


export type AceItemConnectionminArgs = {
  field: AceItemFieldSelector;
};


export type AceItemConnectionsumArgs = {
  field: AceItemFieldSelector;
};


export type AceItemConnectiongroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: AceItemFieldSelector;
};

export type AceItemEdge = {
  next?: Maybe<AceItem>;
  node: AceItem;
  previous?: Maybe<AceItem>;
};

export type AceItemGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<AceItemEdge>;
  nodes: Array<AceItem>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<AceItemGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type AceItemGroupConnectiondistinctArgs = {
  field: AceItemFieldSelector;
};


export type AceItemGroupConnectionmaxArgs = {
  field: AceItemFieldSelector;
};


export type AceItemGroupConnectionminArgs = {
  field: AceItemFieldSelector;
};


export type AceItemGroupConnectionsumArgs = {
  field: AceItemFieldSelector;
};


export type AceItemGroupConnectiongroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: AceItemFieldSelector;
};

export type LunarItemConnection = {
  totalCount: Scalars['Int'];
  edges: Array<LunarItemEdge>;
  nodes: Array<LunarItem>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<LunarItemGroupConnection>;
};


export type LunarItemConnectiondistinctArgs = {
  field: LunarItemFieldSelector;
};


export type LunarItemConnectionmaxArgs = {
  field: LunarItemFieldSelector;
};


export type LunarItemConnectionminArgs = {
  field: LunarItemFieldSelector;
};


export type LunarItemConnectionsumArgs = {
  field: LunarItemFieldSelector;
};


export type LunarItemConnectiongroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: LunarItemFieldSelector;
};

export type LunarItemEdge = {
  next?: Maybe<LunarItem>;
  node: LunarItem;
  previous?: Maybe<LunarItem>;
};

export type LunarItemFieldSelector = {
  id?: InputMaybe<FieldSelectorEnum>;
  parent?: InputMaybe<NodeFieldSelector>;
  children?: InputMaybe<NodeFieldSelector>;
  internal?: InputMaybe<InternalFieldSelector>;
  coverThumbnail?: InputMaybe<FieldSelectorEnum>;
  title?: InputMaybe<FieldSelectorEnum>;
  creators?: InputMaybe<FieldSelectorEnum>;
  description?: InputMaybe<FieldSelectorEnum>;
  isMature?: InputMaybe<FieldSelectorEnum>;
};

export type LunarItemGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<LunarItemEdge>;
  nodes: Array<LunarItem>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<LunarItemGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type LunarItemGroupConnectiondistinctArgs = {
  field: LunarItemFieldSelector;
};


export type LunarItemGroupConnectionmaxArgs = {
  field: LunarItemFieldSelector;
};


export type LunarItemGroupConnectionminArgs = {
  field: LunarItemFieldSelector;
};


export type LunarItemGroupConnectionsumArgs = {
  field: LunarItemFieldSelector;
};


export type LunarItemGroupConnectiongroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: LunarItemFieldSelector;
};

export type LunarItemFilterInput = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  coverThumbnail?: InputMaybe<StringQueryOperatorInput>;
  title?: InputMaybe<StringQueryOperatorInput>;
  creators?: InputMaybe<StringQueryOperatorInput>;
  description?: InputMaybe<StringQueryOperatorInput>;
  isMature?: InputMaybe<BooleanQueryOperatorInput>;
};

export type LunarItemSortInput = {
  id?: InputMaybe<SortOrderEnum>;
  parent?: InputMaybe<NodeSortInput>;
  children?: InputMaybe<NodeSortInput>;
  internal?: InputMaybe<InternalSortInput>;
  coverThumbnail?: InputMaybe<SortOrderEnum>;
  title?: InputMaybe<SortOrderEnum>;
  creators?: InputMaybe<SortOrderEnum>;
  description?: InputMaybe<SortOrderEnum>;
  isMature?: InputMaybe<SortOrderEnum>;
};

export type SearchIndexQueryVariables = Exact<{ [key: string]: never; }>;


export type SearchIndexQuery = { localSearchCatalogue?: { publicIndexURL: string, publicStoreURL: string } | undefined, allAceItem: { nodes: Array<{ id: string, title: string, previewsCode: string, price: number, publisher: string, slug: string, creators?: string | undefined, isMature?: boolean | undefined, isOfferedAgain?: boolean | undefined }> } };

export type ItemPageQueryVariables = Exact<{
  previewsCode: Scalars['String'];
}>;


export type ItemPageQuery = { aceItem?: { previewsCode: string, price: number, title: string, description?: string | undefined, isMature?: boolean | undefined, isOfferedAgain?: boolean | undefined, creators?: string | undefined, coverThumbnail?: string | undefined, publisher: string } | undefined };
