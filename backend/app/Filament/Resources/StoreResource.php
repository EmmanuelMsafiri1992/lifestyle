<?php

namespace App\Filament\Resources;

use App\Filament\Resources\StoreResource\Pages;
use App\Models\Store;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;

class StoreResource extends Resource
{
    protected static ?string $model = Store::class;
    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-building-storefront';
    protected static ?int $navigationSort = 1;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Basic Information')->schema([
                TextInput::make('name')->required()->maxLength(255),
                TextInput::make('slug')->required()->unique(ignoreRecord: true)->maxLength(255),
                Select::make('type')->required()->options([
                    'cozy_kitchen' => 'The Cozy Kitchen',
                    'cannabis_cabinet' => 'The Cannabis Cabinet',
                    'gr_oil' => 'GR Oil',
                    'adults_only' => 'Adults Only',
                ]),
                TextInput::make('tagline')->maxLength(255),
                Textarea::make('description')->rows(3),
            ])->columns(2),

            Section::make('Appearance')->schema([
                FileUpload::make('logo')->image()->directory('stores/logos'),
                FileUpload::make('banner')->image()->directory('stores/banners'),
                ColorPicker::make('primary_color')->default('#4F7942'),
            ])->columns(3),

            Section::make('Settings')->schema([
                Toggle::make('is_active')->default(true),
                Toggle::make('accepts_orders')->default(true),
                Toggle::make('requires_age_gate')->default(false),
                TextInput::make('min_age')->numeric()->default(18),
                TextInput::make('sort_order')->numeric()->default(0),
            ])->columns(3),

            Section::make('Contact')->schema([
                TextInput::make('phone'),
                TextInput::make('email')->email(),
                TextInput::make('whatsapp'),
                Textarea::make('address')->rows(2),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('logo')->circular(),
                Tables\Columns\TextColumn::make('name')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('type')->badge()->sortable(),
                Tables\Columns\IconColumn::make('is_active')->boolean(),
                Tables\Columns\IconColumn::make('accepts_orders')->boolean(),
                Tables\Columns\IconColumn::make('requires_age_gate')->boolean()->label('Age Gate'),
                Tables\Columns\TextColumn::make('sort_order')->sortable(),
            ])
            ->filters([])
            ->actions([Tables\Actions\EditAction::make()])
            ->bulkActions([Tables\Actions\BulkActionGroup::make([Tables\Actions\DeleteBulkAction::make()])]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListStores::route('/'),
            'create' => Pages\CreateStore::route('/create'),
            'edit' => Pages\EditStore::route('/{record}/edit'),
        ];
    }
}
