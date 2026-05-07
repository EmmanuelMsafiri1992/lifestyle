<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Models\Order;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;
    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-shopping-cart';
    protected static ?int $navigationSort = 4;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Order Info')->schema([
                TextInput::make('order_number')->disabled(),
                Select::make('status')->options([
                    'pending' => 'Pending',
                    'confirmed' => 'Confirmed',
                    'preparing' => 'Preparing',
                    'ready' => 'Ready',
                    'out_for_delivery' => 'Out for Delivery',
                    'delivered' => 'Delivered',
                    'cancelled' => 'Cancelled',
                ])->required(),
                Select::make('payment_status')->options([
                    'pending' => 'Pending',
                    'paid' => 'Paid',
                    'failed' => 'Failed',
                    'refunded' => 'Refunded',
                ])->required(),
                TextInput::make('payment_reference')->disabled(),
            ])->columns(2),

            Section::make('Customer')->schema([
                TextInput::make('customer_name')->disabled(),
                TextInput::make('customer_email')->disabled(),
                TextInput::make('customer_phone')->disabled(),
                Textarea::make('delivery_address')->disabled()->rows(2),
                Textarea::make('notes')->disabled()->rows(2),
            ])->columns(2),

            Section::make('Totals')->schema([
                TextInput::make('subtotal')->prefix('R')->disabled(),
                TextInput::make('delivery_fee')->prefix('R')->disabled(),
                TextInput::make('total')->prefix('R')->disabled(),
            ])->columns(3),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('order_number')->searchable()->sortable()->copyable(),
                Tables\Columns\TextColumn::make('store.name')->badge()->sortable(),
                Tables\Columns\TextColumn::make('customer_name')->searchable(),
                Tables\Columns\TextColumn::make('customer_phone'),
                Tables\Columns\TextColumn::make('status')->badge()->sortable(),
                Tables\Columns\TextColumn::make('payment_status')->badge()->sortable(),
                Tables\Columns\TextColumn::make('delivery_type')->badge(),
                Tables\Columns\TextColumn::make('total')->money('ZAR')->sortable(),
                Tables\Columns\TextColumn::make('created_at')->dateTime('d M Y H:i')->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('store')->relationship('store', 'name'),
                Tables\Filters\SelectFilter::make('status')->options([
                    'pending' => 'Pending',
                    'confirmed' => 'Confirmed',
                    'preparing' => 'Preparing',
                    'ready' => 'Ready',
                    'delivered' => 'Delivered',
                    'cancelled' => 'Cancelled',
                ]),
                Tables\Filters\SelectFilter::make('payment_status')->options([
                    'pending' => 'Pending',
                    'paid' => 'Paid',
                    'failed' => 'Failed',
                ]),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([]);
    }

    public static function infolist(Schema $schema): Schema
    {
        return $schema->components([
            \Filament\Infolists\Components\Section::make('Order Details')->schema([
                TextEntry::make('order_number')->copyable(),
                TextEntry::make('store.name')->badge(),
                TextEntry::make('status')->badge(),
                TextEntry::make('payment_status')->badge(),
                TextEntry::make('payment_method'),
                TextEntry::make('delivery_type'),
            ])->columns(3),

            \Filament\Infolists\Components\Section::make('Customer')->schema([
                TextEntry::make('customer_name'),
                TextEntry::make('customer_email'),
                TextEntry::make('customer_phone'),
                TextEntry::make('delivery_address'),
                TextEntry::make('notes'),
            ])->columns(2),

            \Filament\Infolists\Components\Section::make('Totals')->schema([
                TextEntry::make('subtotal')->money('ZAR'),
                TextEntry::make('delivery_fee')->money('ZAR'),
                TextEntry::make('total')->money('ZAR'),
            ])->columns(3),

            \Filament\Infolists\Components\Section::make('Items')->schema([
                RepeatableEntry::make('items')->schema([
                    TextEntry::make('product_name'),
                    TextEntry::make('price')->money('ZAR'),
                    TextEntry::make('quantity'),
                    TextEntry::make('subtotal')->money('ZAR'),
                ])->columns(4),
            ]),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'view' => Pages\ViewOrder::route('/{record}'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}
